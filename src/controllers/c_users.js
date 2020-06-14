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
 * response: function(res, status_execution, data, status_code, message)
 */
const my_response = require("../helpers/my_response");

// import joi
const validate = require('../helpers/joi_schema');


/**
 * CRUD
 */
async function get_users(req, res) {
    try {
        const result = await users_model.get_all_data();
        for (key in result) {
            delete result[key].user_password;
        }
        return my_response.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, "Internal Server Error");
    }
}



module.exports = {
    get_users
}