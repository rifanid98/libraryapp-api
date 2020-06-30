/**
 * Model
 * .
 * Load Model
 */
const historiesModel = require("../models/m_histories");

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
async function getHistories(req, res) {
    try {
        const result = await historiesModel.getAllData();
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

async function getHistoryById(req, res) {
    try {
        const id = req.params.id;
        const result = await historiesModel.getDataById(id);
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}


//================ POST ====================//
async function postHistory(req, res) {
    try {
        const error = await validate.validateGenres(req.body);

        const data = req.body;
        const checkGenre = await historiesModel.getDataByName(data);

        if (checkGenre.length > 0) {
            const message = `Duplicate data ${data.name}`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const result = await historiesModel.addData(data);
        if (result.affectedRows > 0) {
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
async function patchHistory(req, res) {
    try {
        const error = await validate.validateGenres(req.body);

        const data = req.body;
        const id = req.params.id;
        const checkGenre = await historiesModel.getDataByName(data);

        if (checkGenre.length > 0) {
            const message = `Duplicate data ${data.name}`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const result = await historiesModel.updateData(data, id);

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
async function deleteHistory(req, res) {
    try {
        const id = req.params.id;
        const result = await historiesModel.deleteData(id);

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
    getHistories,
    postHistory,
    patchHistory,
    deleteHistory,
    getHistoryById
}