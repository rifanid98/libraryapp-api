/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {
    
    get_all_data: function() {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM books";
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    get_data_by_id: function (id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM books WHERE book_id = ?";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
    
    get_data_by_filter: function (filter) {
        return new Promise((resolve, reject) => {
            const sqlQuery = 
            `SELECT 
            books.*, 
            book_genres.book_genre_name 
            FROM 
            books INNER JOIN book_genres 
            WHERE 
            books.book_genre_id=book_genres.book_genre_id 
            AND 
            (` + filter + `)`;

            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    get_data_by_sort: function (sort) {
        return new Promise((resolve, reject) => {
            const sqlQuery =
                `SELECT 
            books.*, 
            book_genres.book_genre_name 
            FROM 
            books INNER JOIN book_genres 
            WHERE 
            books.book_genre_id=book_genres.book_genre_id ORDER BY book_` + sort.sort + ` ASC`;
            
            // console.log(sqlQuery);
            
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    add_data: function(data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "INSERT INTO books SET ?";
            conn.query(sqlQuery, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    update_data: function(data, id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "UPDATE books SET ? WHERE book_id = ?";
            conn.query(sqlQuery, [data, id], function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    delete_data: function(id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "DELETE FROM books WHERE book_id = ?";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
}