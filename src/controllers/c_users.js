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
    getUsers
}