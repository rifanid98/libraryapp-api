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
// import bodyParser
const bodyParser = require('body-parser');
// import morgan
const morgan = require('morgan');
// import dotenv
require('dotenv').config();
// import custom global config
const config = require('./src/configs/global');
// import custom response
const myResponse = require("./src/helpers/myResponse");

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**============================ Routes ============================ */

/**
 * Routes
 * .
 * My Custom Controllers
 */
// example
// const productControllers = require("./controllers/c_product");
const bookController = require("./controllers/c_book");

// fire the controllers
app.use('/libraryapp/api/book', bookController);

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
function connect(){
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