/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {

    getAllData: function () {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM histories";
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
    getDataByUserId: function (id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM v_histories WHERE done = 1 AND user_id = ? ORDER BY updated";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },	
    getAllDetailData: function () {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM v_histories WHERE done = 1 ORDER BY updated";
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
    getDataPending: function (bookId, userId) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM histories WHERE done = 0 AND book_id = ? AND user_id = ?";
            conn.query(sqlQuery, [bookId, userId], function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
    getDataByName: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM v_histories WHERE ? ";

            conn.query(sqlQuery, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    getDataById: function (id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM v_histories WHERE history_id = ? ";

            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    getBorrowStatus: function (userId, bookId) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM histories WHERE user_id = ? AND book_id = ? AND done = 0";

            conn.query(sqlQuery, [userId, bookId], function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },


    addData: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "INSERT INTO histories SET ?";
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
            const sqlQuery = "UPDATE histories SET ? WHERE history_id = ?";
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
            const sqlQuery = "DELETE FROM histories WHERE history_id = ?";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
}