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
const authorController = require('../controllers/c_authors');

// Get All Author
router.get('/', authMiddleware.checkRole([3, 2, 1]), authorController.getAuthors);
// Get detaul author
router.get('/:id', authMiddleware.checkRole([3, 2, 1]), authorController.getAuthorsById);
// Post a Author
router.post('/', authMiddleware.checkRole([2, 1]), upload.none(), authorController.postAuthor);
// Patch a Author
router.patch('/:id', authMiddleware.checkRole([2, 1]), upload.none(), authorController.patchAuthor);
// Delete a Author
router.delete('/:id', authMiddleware.checkRole([1]), authorController.deleteAuthor);


module.exports = router;