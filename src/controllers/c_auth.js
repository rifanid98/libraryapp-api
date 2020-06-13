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

// import
const config = require('../configs/global');

// untuk menampung token
const tokenList = {}

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
        delete result[0].user_password;
        
        // jsonwebtoken
        const tokenData = {
          ...result[0]
        }
        const token = jwt.sign(tokenData, config.jwtSecretKey, {expiresIn: config.jwtTokenLoginLifeTime});
        const tokenRefresh = jwt.sign(tokenData, config.jwtSecretKey, {expiresIn: config.jwtTokenRefreshLifeTime});
        result[0].tokenLogin = token;
        result[0].tokenRefresh = tokenRefresh;

        return myResponse.response(res, "success", result, 200, "Ok!");
      } else {
        return myResponse.response( res, "failed", "Username or Password is wrong!", 400, "Internal Server Error");
      }
    } catch (error) {
      console.log(error);
      return myResponse.response( res, "failed", "Username or Password is wrong!", 500, "Internal Server Error");
    }
  },

  refreshtoken: async function (req, res) {
      try {
		  const data = req.body;
		  const error = await validate.validate_refresh_token(data);

		  const token_refresh = data.token_refresh;
		  const decoded = jwt.verify(token_refresh, config.jwtSecretKey);  
		  let newData = {};
		  for (key in decoded) {
			  if (key != 'iat' && key != 'exp') {
				  newData[key] = decoded[key];
			  }
		  }
		  const token_login = jwt.sign(newData, config.jwtSecretKey, { expiresIn: config.jwtTokenLoginLifeTime });
		  return myResponse.response(res, "success", { token_login: token_login}, 200, "Ok!");
      } catch (error) {
        if ("joiError" in error) {
          // delete new image when validation error
          return myResponse.response(res, "failed", error, 500, "Internal Server Error")
        }
        console.log(error);
        return myResponse.response(res, "failed", error, 500, "Internal Server Error");
      }
  }

};
