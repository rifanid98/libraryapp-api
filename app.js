/**======================== ExpressJs ============================= */

/**
 * ExpressJs Framework
 */
// import express fw
const express = require('express');
// initiate of express js
const app = express();

/**=========================== Modules ============================ */

/**
 * Modules
 */
// import cors
const cors = require('cors');
// import body_parser
const body_parser = require('body-parser');
// import morgan
const morgan = require('morgan');
// import dotenv
require('dotenv').config();

/**
 * Global Root Path
 */
const config = require('./src/configs/global');
const path = require('path');
global.appRoot = path.resolve(__dirname);

/**============================= CORS ============================= */

/**
 * CORS Handling
 * .
 * I Mean, Simple CORS Handling!
 */
app.use(cors());

/**============================ Morgan ============================ */

/**
 * Morgan Logging
 */
app.use(morgan('dev'));

/**========================== Body Parser ========================= */

/**
 * Body Parser
 * .
 * Menerima request
 */
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

/**============================ Routes ============================ */

/**
 * Multer
 * .
 * Menerima data form
 */
// for parsing multipart/form-data
app.use(`/${config.rootProjectPath}`, express.static("src/assets/"));
// app.use("/libraryapp-api", express.static("src/assets/"));

/**
 * Routes
 * .
 * Load all routes in one file
 */
// Load routes
const routes = require('./src/routes/r_index');
// set the routes
app.use(`/${config.rootProjectPath}`, routes);
// app.use('/libraryapp-api', routes);

/**============================= URLs ============================= */

/**
 * URL Error Handling
 */
// handling error when the url is not found
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    });
})

/**============================== MySQL =========================== */

/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('./src/helpers/mysql');
// connect function
function connect() {
    conn.connect(function (error) {
        if (error) throw error;
        console.log("DB Connected!");
    });
}

/**============================ Server ============================ */

/**
 * Server Start
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connect();
    console.log("Server is running on port " + port);
});

/**============================== EOL ============================= */