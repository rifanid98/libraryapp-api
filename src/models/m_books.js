/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

/**
 * Custom Function
 */
function generate_like(filters = {}) {
    let result = "";
    const length = Object.keys(filters).length - 1;
    let i = 0;
    for (key in filters) {
        const filter = "'%" + filters[key] + "%'";
        let field = "book_" + key;
        if (key == "genre") {
            field = "book_" + key + "_name";
        }
        result += (i == length) ? field + " LIKE " + filter : field + " LIKE " + filter + " OR ";
        i++;
    }
    return result;
}

module.exports = {
    get_field_name: function() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `DESCRIBE books`;
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                let fields = [];
                result.forEach(field => {
                    fields.push(field['Field']);
                });
                resolve(fields);
            })
        })
    },

    get_data_custom: function (filters, total_data) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM `v_book_and_genre` ";
            
            // search
            if (Object.keys(filters.search).length > 0) {
                sqlQuery += " WHERE " + generate_like(filters.search);
            }

            // sort
            if (Object.keys(filters.sort).length > 0) {
                sqlQuery += " ORDER BY book_" + filters.sort.sort + " ASC";
            }

            // pagination
            if (Object.keys(filters.pagination).length > 0) {
                let data_per_page = 5; 
                let active_page = 1
                
                if ("limit" in filters.pagination) {
                    data_per_page = filters.pagination.limit;
                }
                if ("page" in filters.pagination) {
                    active_page = filters.pagination.page;
                }
                
                let first_data = (data_per_page * active_page) - data_per_page;
                sqlQuery += ("page" in filters.pagination) ? " LIMIT " + first_data + ", " + data_per_page + " " : "";
            }
            
            conn.query(sqlQuery, filters.search, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

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

    get_data_by_name: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM books WHERE book_title = ?";
            conn.query(sqlQuery, data, function (error, result) {
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