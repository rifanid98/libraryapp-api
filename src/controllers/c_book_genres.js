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
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import joi
const joi = require('joi');

/**
 * CRUD
 */

//================ GET =====================//
async function get_book_genres(req, res) {
    try {
        const result = await book_genres_model.get_all_data();

        return myResponse.response(res, "success", result, 200, "Ok!")
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error");
    }
}

//================ POST ====================//
async function post_book_genre(req, res) {
    
    try {
        const data = req.body;
        let result = await book_genres_model.get_data_by_name(data);
        console.log(data);
        
        if (result.length > 0) {
            return myResponse.response(res, "failed", data, 409, "already exists!")
        } else {
            result = await book_genres_model.add_data(data);
            return myResponse.response(res, "success", data, 201, "Created!")
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error");
    }
}

//================ PATCH ====================//
async function patch_book_genre(req, res) {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await book_genres_model.update_data(data, id);
        
        if (result.affectedRows > 0){
            return myResponse.response(res, "success", data, 200, "Ok!")
        } else {
            return myResponse.response(res, "failed", data, 200, "data with id " + id + " is not found")
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error");
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
            return myResponse.response(res, "success", data, 200, "Deleted!")
        } else {
            return myResponse.response(res, "failed", data, 200, "data with id " + id + " is not found")
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error");
    }
}

 module.exports = {
     get_book_genres,
     post_book_genre,
     patch_book_genre,
     delete_book_genre
 }