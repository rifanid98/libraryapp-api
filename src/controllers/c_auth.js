/**
 * Model
 * .
 * Load Model
 */
const auth_model = require("../models/m_auth");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, status_execution, data, status_code, message)
 */
const my_response = require("../helpers/my_response");

// import joi
const validate = require("../helpers/joi_schema");

// import bcrypt
const bcrypt = require("bcrypt");

// import jwt
const jwt = require("jsonwebtoken");

// import
const config = require("../configs/global");

// import custom error message
const error_message = require("../helpers/my_error_message");

module.exports = {

    register: async function (req, res) {
        try {
            const data = req.body;
            const error = await validate.validate_register(data);
            
            const check_data = await auth_model.get_data_by_name(data.user_name);
            if (check_data < 1) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(data.user_password, salt);
                data.user_password = hash;

                const result = await auth_model.register(data);
                delete data.user_password;
                return my_response.response(res, "success", data, 201, "Created!");
            } else {
                const message = `duplicate data. ${data.user_name} is exists`;
                return my_response.response(res, "failed", "", 409, message);
            }
        } catch (error) {
            console.log(error);
            return my_response.response( res, "failed", "", 500, error_message.my_error_message(error, {}));
        }
    },

    login: async function (req, res) {
        try {
            const data = req.body;
            const error = await validate.validate_login(data);

            const result = await auth_model.login(data.user_name);
            if (result.length > 0) {
                if (bcrypt.compareSync(data.user_password, result[0].user_password)) {
                    delete result[0].user_password;

                    // jsonwebtoken
                    const token_loginData = {
                        ...result[0],
                        token_type: 'login'
                    };
                    const token = jwt.sign(token_loginData, config.jwt_secret_key, {expiresIn: config.jwt_token_login_life_time});
                    const token_refreshData = {
                        ...result[0],
                        token_type: 'refresh'
                    };
                    const token_refresh = jwt.sign(token_refreshData, config.jwt_secret_key, {expiresIn: config.jwt_token_refresh_life_time});
                    result[0].token_login = token;
                    result[0].token_refresh = token_refresh;

                    return my_response.response(res, "success", result, 200, "Ok!");
                } else {
                    const message = `Username or Password is wrong!`;
                    return my_response.response( res, "failed", "", 400, message);
                }
            } else {
                const message = `Username or Password is wrong!`;
                return my_response.response(res, "failed", "", 400, message);
            }
        } catch (error) {
            console.log(error);
            return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
        }
    },

    refresh_token: async function (req, res) {
        try {
            const data = req.body;
            const error = await validate.validate_refresh_token(data);

            const token_refresh = data.token_refresh;
            const decoded = jwt.verify(token_refresh, config.jwt_secret_key);
            console.log(decoded);
            
            if (decoded.token_type == 'refresh') {
                delete decoded.iat;
                delete decoded.exp;
                decoded.token_type = 'login';
                const token_login = jwt.sign(decoded, config.jwt_secret_key, {expiresIn: config.jwt_token_login_life_time});
                return my_response.response(res, "success", { token_login: token_login }, 200, "Ok!");
            } else {
                const message = `Wrong token. Please use refresh token`;
                return my_response.response(res, "failed", error, 500, message);
            }
        } catch (error) {
            console.log(error);
            return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
        }
    },
};
