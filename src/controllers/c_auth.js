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
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import joi
const validate = require("../helpers/joiSchema");

// import bcrypt
const bcrypt = require("bcrypt");

// import jwt
const jwt = require("jsonwebtoken");

// import
const config = require("../configs/global");

// untuk menampung token
const tokenList = {};

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
                return myResponse.response(res, "success", data, 201, "Created!");
            } else {
                const message = {
                    error: 'duplicate data',
                    message: `${data.user_name} is exists`
                }
                return myResponse.response(res, "failed", "", 409, message);
            }
        } catch (error) {
            console.log(error);
            return myResponse.response(
                res,
                "failed",
                "Register Gagal",
                500,
                "Internal Server Error"
            );
        }
    },

    login: async function (req, res) {
        try {
            const data = req.body;
            const error = await validate.validate_login(data);

            const result = await auth_model.login(data.user_name);
            if (
                bcrypt.compareSync(data.user_password, result[0].user_password)
            ) {
                delete result[0].user_password;

                // jsonwebtoken
                const tokenLoginData = {
                    ...result[0],
                    tokenType: 'login'
                };
                const token = jwt.sign(tokenLoginData, config.jwtSecretKey, {expiresIn: config.jwtTokenLoginLifeTime});
                const tokenRefreshData = {
                    ...result[0],
                    tokenType: 'refresh'
                };
                const tokenRefresh = jwt.sign(tokenRefreshData, config.jwtSecretKey, {expiresIn: config.jwtTokenRefreshLifeTime});
                result[0].tokenLogin = token;
                result[0].tokenRefresh = tokenRefresh;

                return myResponse.response(res, "success", result, 200, "Ok!");
            } else {
                return myResponse.response(
                    res,
                    "failed",
                    "Username or Password is wrong!",
                    400,
                    "Internal Server Error"
                );
            }
        } catch (error) {
            console.log(error);
            return myResponse.response(
                res,
                "failed",
                "Username or Password is wrong!",
                500,
                "Internal Server Error"
            );
        }
    },

    refreshtoken: async function (req, res) {
        try {
            const data = req.body;
            const error = await validate.validate_refresh_token(data);

            const token_refresh = data.token_refresh;
            const decoded = jwt.verify(token_refresh, config.jwtSecretKey);
            if (decoded.tokenType == 'refresh') {
                delete decoded.iat;
                delete decoded.exp;
                const token_login = jwt.sign(decoded, config.jwtSecretKey, {expiresIn: config.jwtTokenLoginLifeTime});
                return myResponse.response(res, "success", { token_login: token_login }, 200, "Ok!");
            } else {
                const message = {
                    error: 'Wrong token',
                    message: 'Please use refresh token'
                }
                return myResponse.response(res, "failed", error, 500, message);
            }
        } catch (error) {
            if ("joiError" in error) {
                // delete new image when validation error
                return myResponse.response(res, "failed", error, 500, "Internal Server Error");
            }
            console.log(error);
            return myResponse.response(res, "failed", error, 500, "Internal Server Error");
        }
    },
};
