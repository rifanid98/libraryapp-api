/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

// import middlewares
const authMiddleware = require('../middlewares/mdl_auth');
const validationMiddleware = require('../middlewares/mdl_validation');

/**
 * Load All Routes
 */
const booksRouter = require('./r_books');
const genresRouter = require('./r_genres');
const authorRouter = require('./r_author');
const authRouter = require('./r_auth');
const usersRouter = require('./r_users');

/**
 * Fire the router
 */
router.use('/books', validationMiddleware.xssEscape, authMiddleware.verifyJwtToken, booksRouter);
router.use('/genres', validationMiddleware.xssEscape, authMiddleware.verifyJwtToken, genresRouter);
router.use('/authors', validationMiddleware.xssEscape, authMiddleware.verifyJwtToken, authorRouter);
router.use('/auth', validationMiddleware.xssEscape, authRouter);
router.use("/users", validationMiddleware.xssEscape, authMiddleware.verifyJwtToken, usersRouter);

module.exports = router;