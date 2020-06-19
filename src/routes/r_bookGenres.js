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
const bookGenresController = require('../controllers/c_bookGenres');

// Get All Books
router.get('/', authMiddleware.checkRole([3, 2, 1]), bookGenresController.getBookGenres);
// Post a Book
router.post('/', authMiddleware.checkRole([2, 1]), upload.none(), bookGenresController.postBookGenre);
// Patch a Book
router.patch('/:id', authMiddleware.checkRole([2, 1]), upload.none(), bookGenresController.patchBookGenre);
// Delete a Book
router.delete('/:id', authMiddleware.checkRole([1]), bookGenresController.deleteBookGenre);


module.exports = router;