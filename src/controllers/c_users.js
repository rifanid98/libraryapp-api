/**
 * Model
 * .
 * Load Model
 */
const usersModel = require("../models/m_users");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import joi
const validate = require('../helpers/joiSchema');

// import bcrypt
const bcrypt = require("bcrypt");

// import config
const config = require('../configs/global');

// import custom error message
const errorMessage = require("../helpers/myErrorMessage");

// delete image
const deleteImage = require("../helpers/deleteImage");

/**
 * CRUD
 */
async function getUsers(req, res) {
	try {
		const result = await usersModel.getAllData();
		for (key in result) {
			delete result[key].password;
		}
		return myResponse.response(res, "success", result, 200, "Ok!")
	} catch (error) {
		console.log(error);
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

async function postUser(req, res) {
	try {
		// Joi validation
		const fieldToPatch = Object.keys(req.body);
		await validate.validateUsers(req.body, fieldToPatch);

		const body = req.body;
		let checkUser = 0;
		const checkUsername = await usersModel.getDataByField({ username: body.username });
		const checkEmail = await usersModel.getDataByField({ email: body.email });

		checkUser += checkUsername.length;
		checkUser += checkEmail.length;

		if (checkUser > 0) {
			if (req.file) {
				// delete new image when duplicated data
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Duplicate data ${body.username} or ${body.email}`;
			return myResponse.response(res, "failed", "", 409, message);
		}

		if (req.file === undefined) {
			// set default file when no image to upload
			body.image = `${config.imageUrlPath(req)}avatar.png`;
		} else {
			if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
				// get the image name and set into data
				body.image = `${req.file.filename}`;
				// body.image = `${config.imageUrlPath(req)}${req.file.filename}`;
			} else {
				// delete new file when not an image
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);

				const message = `There is no image to upload`;
				return myResponse.response(res, "failed", "", 500, message);
			}
		}
		// if user registered by admin
		if (!body.password) {
			body.password = '12345';
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(body.password, salt);
		body.password = hash;

		const add = await usersModel.addData(body);
		if (add.affectedRows > 0) {
			delete body.password;
			const result = {
				user_id: add.insertId,
				...body
			}
			return myResponse.response(res, "success", result, 201, "Ok!")
		} else {
			if (req.file) {
				// delete new image when insert data is failed
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Add data failed`;
			return myResponse.response(res, "failed", "", 409, message);
		}
	} catch (error) {
		console.log(error);
		if (req.file) {
			// delete new image when insert data is failed
			const myRequest = { protocol: req.protocol, host: req.get('host') }
			deleteImage.delete(myRequest, req.file.filename);
		}
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

async function patchUser(req, res) {
	try {
		// Joi validation
		const fieldToPatch = Object.keys(req.body);
		await validate.validateUsers(req.body, fieldToPatch);

		const body = req.body;
		const id = req.params.id;

		// checking if data is exists or not
		const oldData = await usersModel.getDataById(id);
		if (oldData.length < 1) {
			if (req.file) {
				// delete new image when duplicated data
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Data with id ${id} not found`;
			return myResponse.response(res, "failed", "", 404, message);
		}

		let userDuplicate = 0;
		const checkUser = await usersModel.getDataByField({ username: body.username });
		checkUser.length > 0
			&& checkUser[0].user_id !== parseInt(id)
			? userDuplicate += checkUser.length : null;
		const checkEmail = await usersModel.getDataByField({ email: body.email });
		checkEmail.length > 0
			&& checkEmail[0].user_id !== parseInt(id)
			? userDuplicate += checkEmail.length : null;

		if (userDuplicate > 0) {
			if (req.file) {
				// delete new image when duplicated data
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Duplicate data ${body.username} or ${body.email}`;
			return myResponse.response(res, "failed", "", 409, message);
		}

		// checking is there a file or not
		let data = {};
		if (req.file === undefined) {
			// if there is no file to upload
			data = {
				...body
			};
		} else {
			// checking type of file
			if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
				data = {
					...body,
					image: `${req.file.filename}`,
					// image: `${config.imageUrlPath(req)}${req.file.filename}`,
				};
			} else {
				// delete new file when not an image
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);

				const message = `There is no image to upload`;
				return myResponse.response(res, "failed", "", 500, message);
			}
		}

		if (data.password) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(data.password, salt);
			data.password = hash;
		}

		const update = await usersModel.updateData(data, id);
		if (update.affectedRows > 0) {
			const imageName = oldData[0].image.split('/').pop();
			if (imageName != 'avatar.png' && req.file !== undefined) {
				// delete old image when not default image
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, oldData[0].image);
			}

			data.password && delete data.password;
			const result = {
				user_id: update.insertId,
				...data
			}
			return myResponse.response(res, "success", result, 200, "Ok!")
		} else {
			if (req.file) {
				// delete new image when duplicated data
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Update data failed`;
			return myResponse.response(res, "failed", "", 409, message);
		}
	} catch (error) {
		console.log(error);

		// delete image when error
		if (req.file) {
			const myRequest = { protocol: req.protocol, host: req.get('host') }
			deleteImage.delete(myRequest, req.file.filename);
		}

		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

async function deleteUser(req, res) {
	try {
		const id = req.params.id;
		const oldData = await usersModel.getDataById(id);
		if (oldData.length < 1) {
			const message = `Data with id ${id} not found`;
			return myResponse.response(res, "failed", "", 404, message);
		}
		const result = await usersModel.deleteDataById(id);
		if (result.affectedRows > 0) {
			const imageName = oldData[0].image.split('/').pop();
			if (imageName != 'avatar.png') {
				// delete old image when not default image
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, oldData[0].image);
			}
			return myResponse.response(res, "success", { user_id: id }, 200, "Deleted!")
		} else {
			const message = `Internal Server Error`;
			return myResponse.response(res, "failed", "", 500, message);
		}
	} catch (error) {
		console.log(error);
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

/**
 * Another CRUD
 */
async function getUserById(req, res) {
	try {
		const id = req.params.id;
		const result = await usersModel.getDataById(id);
		for (key in result) {
			delete result[key].password;
		}
		return myResponse.response(res, "success", result, 200, "Ok!")
	} catch (error) {
		console.log(error);
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

module.exports = {
	deleteUser,
	getUsers,
	postUser,
	patchUser,
	getUserById
}