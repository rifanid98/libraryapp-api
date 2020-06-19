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
const authMiddleware = require('../middlewares/mdl_auth');

/**
 * Controllers
 */
// load the controller
const usersController = require('../controllers/c_users');

// register user
router.get('/', authMiddleware.checkRole([3, 2, 1]), usersController.getUsers);
router.delete('/:id', authMiddleware.checkRole([3, 2, 1]), usersController.deleteUser);

module.exports = router;