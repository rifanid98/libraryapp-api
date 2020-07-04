/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {

  getAllData: function () {
    return new Promise((resolve, reject) => {
      const sqlQuery = "SELECT * FROM authors";
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
      const sqlQuery = "SELECT * FROM authors WHERE ? ";

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
      const sqlQuery = "SELECT * FROM authors WHERE author_id = ? ";

      conn.query(sqlQuery, id, function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
      })
    })
  },

  addData: function (data) {
    return new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO authors SET ?";
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
      const sqlQuery = "UPDATE authors SET ? WHERE author_id = ?";
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
      const sqlQuery = "DELETE FROM authors WHERE author_id = ?";
      conn.query(sqlQuery, id, function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
      })
    })
  },
}