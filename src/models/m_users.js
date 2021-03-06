/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

/**
 * CRUD
 */
function getAllData() {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM users";
        conn.query(sqlQuery, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

function addData(data) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users SET ?";
        conn.query(sqlQuery, data, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

function updateData(data, id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "UPDATE users SET ? WHERE user_id = ?";
        conn.query(sqlQuery, [data, id], function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

function deleteDataById(id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "DELETE FROM users WHERE user_id = ?";
        conn.query(sqlQuery, id, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

/**
 * Another CRUD
 */
function getDataById(id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM users WHERE user_id = ?";
        conn.query(sqlQuery, id, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

function getDataByField(field) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM users WHERE ?";
        conn.query(sqlQuery, field, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

module.exports = {
    getAllData,
    getDataById,
    addData,
    updateData,
    deleteDataById,
    getDataByField
}