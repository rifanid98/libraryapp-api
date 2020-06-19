/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

module.exports = {
    getBookAndGenreFieldName: function() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `DESCRIBE v_book_and_genre`;
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
    }
}