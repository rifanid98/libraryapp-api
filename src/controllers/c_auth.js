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
const validate = require('../helpers/joiSchema');

// import bcrypt
const bcrypt = require("bcrypt");

// import jwt
const jwt = require('jsonwebtoken');

module.exports = {
  register: async function (req, res) {
    try {
      const data = req.body;
      const error = await validate.validate_register(data);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.user_password, salt);
      data.user_password = hash;

      const result = await auth_model.register(data);
      delete data.user_password;
      return myResponse.response(res, "success", data, 201, "Created!");
    } catch (error) {
      console.log(error);
      return myResponse.response( res, "failed", "Register Gagal", 500, "Internal Server Error");
    }
  },
  login: async function (req, res) {
    try {
      const data = req.body;
      const error = await validate.validate_login(data);

      const result = await auth_model.login(data.user_name);
      if (bcrypt.compareSync(data.user_password, result[0].user_password)) {
        return myResponse.response(res, "success", data, 200, "Ok!");
        
      } else {
        return myResponse.response( res, "failed", "Username or Password is wrong!", 400, "Internal Server Error");
      }
    } catch (error) {
      console.log(error);
      return myResponse.response( res, "failed", "Username or Password is wrong!", 500, "Internal Server Error");
    }
  },
};
