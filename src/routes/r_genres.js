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
const genresController = require('../controllers/c_genres');

// Get All Genres
router.get('/', authMiddleware.checkRole([3, 2, 1]), genresController.getBookGenres);
// Get Detail Genre
router.get('/:id', authMiddleware.checkRole([3, 2, 1]), genresController.getBookGenreById);
// Post a Genre
router.post('/', authMiddleware.checkRole([2, 1]), upload.none(), genresController.postBookGenre);
// Patch a Genre
router.patch('/:id', authMiddleware.checkRole([2, 1]), upload.none(), genresController.patchBookGenre);
// Delete a Genre
router.delete('/:id', authMiddleware.checkRole([1]), genresController.deleteBookGenre);


module.exports = router;