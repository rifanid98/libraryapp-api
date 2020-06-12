/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

/**
 * Load All Routes
 */
const books_router = require('./r_books');
const book_genres_router = require('./r_book_genres');
const auth_router = require('./r_auth');
const users_router = require('./r_users');

/**
 * Fire the router
 */
router.use('/books', books_router);
router.use('/book_genres', book_genres_router);
router.use('/auth', auth_router);
router.use('/users', users_router);

module.exports = router;