/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

/**
 * Controllers
 */
// load the controller
const book_genres_controller = require('../controllers/c_book_genres');

// Get All Books
router.get('/', book_genres_controller.get_book_genres);
// Post a Book
router.post('/', book_genres_controller.post_book_genre);
// Patch a Book
router.patch('/:id', book_genres_controller.patch_book_genre);
// Delete a Book
router.delete('/:id', book_genres_controller.delete_book_genre);


module.exports = router;