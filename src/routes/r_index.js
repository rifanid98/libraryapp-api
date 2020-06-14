/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

// import middleware
const auth_middleware = require('../middleware/mdl_auth');

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
router.use('/books', auth_middleware.verify_jwt_token, books_router);
router.use('/book_genres', auth_middleware.verify_jwt_token, book_genres_router);
router.use('/auth', auth_router);
router.use("/users", auth_middleware.verify_jwt_token, users_router);

module.exports = router;