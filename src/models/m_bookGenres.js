/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {

    getAllData: function () {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM genres";
            conn.query(sqlQuery, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    getDataByName: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "SELECT * FROM genres WHERE name = ? ";
            
            conn.query(sqlQuery, data, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },

    addData: function (data) {
        return new Promise((resolve, reject) => {
            const sqlQuery = "INSERT INTO genres SET ?";
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
            const sqlQuery = "UPDATE genres SET ? WHERE genre_id = ?";
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
            const sqlQuery = "DELETE FROM genres WHERE genre_id = ?";
            conn.query(sqlQuery, id, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    },
}