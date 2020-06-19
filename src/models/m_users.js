/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {
    getAllData: function () {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM users";
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
            const sqlQuery = "INSERT INTO users SET ?";
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
            const sqlQuery = "UPDATE users SET ? WHERE user_id = ?";
            conn.query(sqlQuery, [data, id], function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    deleteDataById: function (id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "DELETE FROM users WHERE user_id = ?";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
}