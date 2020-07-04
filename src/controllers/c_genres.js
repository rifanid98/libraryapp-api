/**
 * Model
 * .
 * Load Model
 */
const bookGenresModel = require("../models/m_genres");

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
async function getGenres(req, res) {
    try {
        const result = await bookGenresModel.getAllData();
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

async function postGenre(req, res) {
    try {
        const error = await validate.validateGenres(req.body);

        const data = req.body;
        const checkGenre = await bookGenresModel.getDataByName(data);

        if (checkGenre.length > 0) {
            const message = `Duplicate data ${data.name}`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const result = await bookGenresModel.addData(data);
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

async function patchGenre(req, res) {
    try {
        const error = await validate.validateGenres(req.body);

        const data = req.body;
        const id = req.params.id;
        const checkGenre = await bookGenresModel.getDataByName(data);

        if (checkGenre.length > 0) {
            const message = `Duplicate data ${data.name}`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const result = await bookGenresModel.updateData(data, id);

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

async function deleteGenre(req, res) {
    try {
        const id = req.params.id;
        const result = await bookGenresModel.deleteData(id);

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

/**
 * Another CRUD
 */
async function getGenreById(req, res) {
    try {
        const id = req.params.id;
        const result = await bookGenresModel.getDataById(id);
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

module.exports = {
    getGenres,
    postGenre,
    patchGenre,
    deleteGenre,
    getGenreById
}