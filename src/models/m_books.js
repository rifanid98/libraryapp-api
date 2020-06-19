/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

/**
 * Custom Function
 */
function generateLike(filters = {}) {
    let result = "";
    const length = Object.keys(filters).length - 1;
    let i = 0;
    for (key in filters) {
        const filter = "'%" + filters[key] + "%'";
        let field = "" + key;
        // if (key == "genre") {
        //     field = key + "_name";
        // }
        result += (i == length) ? field + " LIKE " + filter : field + " LIKE " + filter + " OR ";
        i++;
    }

    return result;
}

module.exports = {
    getFieldName: function () {
        return new Promise((resolve, reject) => {
            conn.query(`DESCRIBE books`, function (error, result) {
                if (error) {
                    reject(error);
                }
                let fields = {};
                result.forEach(field => {
                    fields[field.Field] = field.Field;
                });
                resolve(fields);
            })
        })

    },

    getTotalDataCustom: function (query, data) {
        return new Promise((resolve, reject) => {
            conn.query(query, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result.length);
            })
        })

    },

    getDataCustom: async function (filters) {
        const fields = await this.getFieldName();
        let sqlQuery = "SELECT * FROM `v_book_and_genre` ";

        // search
        if (Object.keys(filters.search).length > 0) {
            sqlQuery += " WHERE " + generateLike(filters.search);
        }

        // sort
        if (Object.keys(filters.sort).length > 0) {
            if (`${filters.sort.sort}` in fields) {
                sqlQuery += " ORDER BY " + filters.sort.sort + " ASC";
            }
        }

        const totalData = await this.getTotalDataCustom(sqlQuery, filters.search);
        
        // pagination
        var data_per_page = 5;
        var active_page = 1
        var total_page = 0;

        if (Object.keys(filters.pagination).length == 2) {

            if (filters.pagination.limit) {
                var data_per_page = filters.pagination.limit;
            }
            if (filters.pagination.page) {
                var active_page = filters.pagination.page;
            }

            let first_data = (data_per_page * active_page) - data_per_page;
            sqlQuery += ("page" in filters.pagination) ? " LIMIT " + first_data + ", " + data_per_page + " " : "";

            var total_page = Math.ceil(totalData / data_per_page);
        }
        
        return new Promise((resolve, reject) => {
            conn.query(sqlQuery, filters.search, function (error, result) {
                if (error) {
                    reject(error);
                }

                const new_result = {
                    total_page,
                    result
                }

                return Object.keys(filters.pagination).length > 0 ? resolve(new_result) : resolve(result);
            })
        })
    },

    getAllData: function () {
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

    getDataById: function (id) {
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

    getDataByFilter: function (filter) {
        return new Promise((resolve, reject) => {
            const sqlQuery =
                `SELECT 
            books.*, 
            genres.name 
            FROM 
            books INNER JOIN genres 
            WHERE 
            books.genre_id=genres.genre_id 
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

    getDataByTitle: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM books WHERE title = ?";
            conn.query(sqlQuery, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    getDataBySort: function (sort) {
        return new Promise((resolve, reject) => {
            const sqlQuery =
                `SELECT 
            books.*, 
            genres.name 
            FROM 
            books INNER JOIN genres 
            WHERE 
            books.genre_id=genres.genre_id ORDER BY ` + sort.sort + ` ASC`;

            // console.log(sqlQuery);

            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    addData: function (data) {
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

    updateData: function (data, id) {
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

    deleteData: function (id) {
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