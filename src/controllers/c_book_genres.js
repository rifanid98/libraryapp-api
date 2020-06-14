/**
 * Model
 * .
 * Load Model
 */
const book_genres_model = require("../models/m_book_genres");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, status_execution, data, status_code, message)
 */
const my_response = require("../helpers/my_response");

// import joi
const validate = require('../helpers/joi_schema');

// import custom error message
const error_message = require("../helpers/my_error_message");

/**
 * CRUD
 */

//================ GET =====================//
async function get_book_genres(req, res) {
    try {
        const result = await book_genres_model.get_all_data();
        return my_response.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

//================ POST ====================//
async function post_book_genre(req, res) {
    try {
        const error = await validate.validate_book_genres(req.body);

        const data = req.body;
        let result = await book_genres_model.get_data_by_name(data);
        
        if (result.length < 1) {
            result = await book_genres_model.add_data(data);
            return my_response.response(res, "success", data, 201, "Created!")
        } else {
            const message = `Duplicate data ${data.book_title}`;
            return my_response.response(res, "failed", "", 409, message);
        }
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

//================ PATCH ====================//
async function patch_book_genre(req, res) {
    try {
        const error = await validate.validate_book_genres(req.body);

        const data = req.body;
        const id = req.params.id;
        const result = await book_genres_model.update_data(data, id);
        
        if (result.affectedRows > 0){
            return my_response.response(res, "success", data, 200, "Ok!")
        } else {
            const message = `Data with id ${id} is not found`;
            return my_response.response(res, "failed", "", 404, message);
        }
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

//================ DELETE ===================//
async function delete_book_genre(req, res) {
    try {
        const id = req.params.id;
        const result = await book_genres_model.delete_data(id);
        
        const data = {
            book_genre_id: id
        }
        if (result.affectedRows >0) {
            return my_response.response(res, "success", data, 200, "Deleted!")
        } else {
            const message = `Data with id ${id} is not found`;
            return my_response.response(res, "failed", "", 404, message);
        }
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

 module.exports = {
     get_book_genres,
     post_book_genre,
     patch_book_genre,
     delete_book_genre
 }