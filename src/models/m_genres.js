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
    const sqlQuery = "SELECT * FROM genres";
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
    const sqlQuery = "INSERT INTO genres SET ?";
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
    const sqlQuery = "UPDATE genres SET ? WHERE genre_id = ?";
    conn.query(sqlQuery, [data, id], function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  })
}

function deleteData(id) {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM genres WHERE genre_id = ?";
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
function getDataByName(data) {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM genres WHERE ? ";

    conn.query(sqlQuery, data, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  })
}

function getDataById(id) {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM genres WHERE genre_id = ? ";

    conn.query(sqlQuery, id, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  })
}

module.exports = {
  getAllData,
  getDataByName,
  getDataById,
  addData,
  updateData,
  deleteData
}