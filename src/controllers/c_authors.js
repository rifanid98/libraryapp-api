/**
 * Model
 * .
 * Load Model
 */
const authorsModel = require("../models/m_authors");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import joi
const validate = require('../helpers/joiSchema');

// import custom error message
const errorMessage = require("../helpers/myErrorMessage");

/**
 * CRUD
 */

//================ GET =====================//
async function getAuthors(req, res) {
    try {
        const result = await authorsModel.getAllData();
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

async function getAuthorsById(req, res) {
    try {
        const id = req.params.id
        const result = await authorsModel.getDataById(id);
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}


//================ POST ====================//
async function postAuthor(req, res) {
    try {
        const error = await validate.validateAuthors(req.body);

        const data = req.body;
        const checkAuthor = await authorsModel.getDataByName(data);

        if (checkAuthor.length > 0) {
            const message = `Duplicate data ${data.name}`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const result = await authorsModel.addData(data);
        if (result.affectedRows > 0) {
            data.author_id = result.insertId;
            return myResponse.response(res, "success", data, 201, "Created!")
        } else {
            const message = `Add data failed`;
            return myResponse.response(res, "failed", "", 409, message);
        }

    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

//================ PATCH ====================//
async function patchAuthor(req, res) {
    try {
        const error = await validate.validateAuthors(req.body);

        const data = req.body;
        const id = req.params.id;
        const checkAuthor = await authorsModel.getDataByName(data);

        if (checkAuthor.length > 0) {
            const message = `Duplicate data ${data.name}`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const result = await authorsModel.updateData(data, id);

        if (result.affectedRows > 0) {
            return myResponse.response(res, "success", data, 200, "Ok!")
        } else {
            const message = `Data with id ${id} is not found`;
            return myResponse.response(res, "failed", "", 404, message);
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

//================ DELETE ===================//
async function deleteAuthor(req, res) {
    try {
        const id = req.params.id;
        const result = await authorsModel.deleteData(id);

        const data = {
            genre_id: id
        }
        if (result.affectedRows > 0) {
            return myResponse.response(res, "success", data, 200, "Deleted!")
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
    getAuthors,
    postAuthor,
    patchAuthor,
    deleteAuthor,
    getAuthorsById
}