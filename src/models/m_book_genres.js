/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {

    get_all_data: function () {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM book_genres";
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    get_data_by_name: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM book_genres WHERE ?";
            
            conn.query(sqlQuery, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    add_data: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "INSERT INTO book_genres SET ?";
            conn.query(sqlQuery, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    update_data: function (data, id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "UPDATE book_genres SET ? WHERE book_genre_id = ?";
            conn.query(sqlQuery, [data, id], function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    delete_data: function (id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "DELETE FROM book_genres WHERE book_genre_id = ?";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
}