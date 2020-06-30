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

// import custom error message
const errorMessage = require("../helpers/myErrorMessage");

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

async function postUser(req, res) {
	try {
		// Joi validation
		await validate.validateUsers(req.body);

		const data = req.body;
		let checkUser = 0;
		const checkUsername = await usersModel.getDataByUsername(data.username);
		const checkEmail = await usersModel.getDataByEmail(data.email);

		checkUser += checkUsername.length;
		checkUser += checkEmail.length;

		if (checkUser > 0) {
			const message = `Duplicate data ${data.username} or ${data.email}`;
			return myResponse.response(res, "failed", "", 409, message);
		}

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(data.password, salt);
		data.password = hash;

		const result = await usersModel.addData(data);
		if (result.affectedRows > 0) {
			delete data.password;
			const newData = {
				user_id: result.insertId,
				...data
			}
			return myResponse.response(res, "success", newData, 200, "Ok!")
		} else {
			const message = `Add data failed`;
			return myResponse.response(res, "failed", "", 409, message);
		}
	} catch (error) {
		console.log(error);
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

async function patchUser(req, res) {
	try {
		// Joi validation
		const fieldToPatch = Object.keys(req.body);
		await validate.validateUsers(req.body, fieldToPatch);

		const data = req.body;
		const id = req.params.id;

		let checkUser = 0;
		const checkUsername = await usersModel.getDataByUsername(data.username);
		const checkEmail = await usersModel.getDataByEmail(data.email);

		checkUser += checkUsername.length;
		checkUser += checkEmail.length;

		if (checkUser > 0) {
			const message = `Duplicate data ${data.username} or ${data.email}`;
			return myResponse.response(res, "failed", "", 409, message);
		}

		if (data.password) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(data.password, salt);
			data.password = hash;
		}

		const result = await usersModel.updateData(data, id);
		if (result.affectedRows > 0) {
			data.password && delete data.password;
			const newData = {
				user_id: result.insertId,
				...data
			}
			return myResponse.response(res, "success", newData, 200, "Ok!")
		} else {
			const message = `Add data failed`;
			return myResponse.response(res, "failed", "", 409, message);
		}
	} catch (error) {
		console.log(error);
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

async function deleteUser(req, res) {
	try {
		const id = req.params.id;
		const result = await usersModel.deleteDataById(id);

		if (result.affectedRows > 0) {
			return myResponse.response(res, "success", { user_id: id }, 200, "Deleted!")
		} else {
			const message = `Data with id ${id} is not found`;
			return myResponse.response(res, "failed", "", 404, message);
		}
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