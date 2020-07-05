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

// Get all users
router.get('/', authMiddleware.checkRole([3, 2, 1]), upload.none(), usersController.getUsers);
// Get detail user
router.get('/:id', authMiddleware.checkRole([3, 2, 1]), upload.none(), usersController.getUserById);
// Post a user
router.post('/', authMiddleware.checkRole([2, 1]), upload.single('image'), usersController.postUser);
// Patch a User
router.patch('/:id', authMiddleware.checkRole([2, 1]), upload.single('image'), usersController.patchUser);
// Delete a user
router.delete('/:id', authMiddleware.checkRole([1]), upload.none(), usersController.deleteUser);

module.exports = router;