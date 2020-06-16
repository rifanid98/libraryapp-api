/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

// import multer upload helper
const upload = require('../helpers/upload');

// import middlewares
const auth_middlewares = require('../middlewares/mdl_auth');

/**
 * Controllers
 */
// load the controller
const users_controller = require('../controllers/c_users');

// register user
router.get('/', auth_middlewares.level_user, users_controller.get_users);

module.exports = router;