/**
 * Model
 * .
 * Load Model
 */
const users_model = require("../models/m_users");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import joi
const validate = require('../helpers/joiSchema');


/**
 * CRUD
 */
async function get_users(req, res) {
    try {
        const result = await users_model.get_all_data();
        for (key in result) {
            delete result[key].user_password;
        }
        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, "Internal Server Error");
    }
}



module.exports = {
    get_users
}