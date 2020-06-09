/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../src/helpers/mysql');
// import custom response
const myResponse = require("../src/helpers/myResponse");

// connect function
function connect() {
    conn.connect(function (error) {
        if (error) throw error;
        console.log("DB Connected!");
    });
}

/**
 * CRUD
 */
function get_all() {
    let sqlQuery = "SELECT * FROM book_detail";
    conn.query(sqlQuery, function(err, result) {
        if (err) throw error;
        
        return result;
    })
}

module.exports = {
    get_all
}