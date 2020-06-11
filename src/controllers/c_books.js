/**
 * Model
 * .
 * Load Model
 */
const books_model = require("../models/m_books");
const dbviews_model = require("../models/m_dbviews");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import fs
const fs = require('fs')
const path = 'src/assets/images/';

// import joi
const validate = require('../helpers/joiSchema');

/**
 * Custom Function
 */

function generate_filters(filters, fields) {
    let search = {};
    let pagination = {};
    let sort = {};
    // get search filters
    for (field in fields) {
        // ambil field name
        const field_name = fields[field].split('_')[1];

        for (filter in filters) {
            // masukin ke search
            if (filter == field_name) {
                if (filter in search == false) {
                    search[filter] = filters[filter].escape();
                }
            }
        }
    }
    // get pagination filters
    for (filter in filters) {
        if ("page" in filters || "limit" in filters) {
            pagination[filter] = filters[filter].escape();
        }
    }
    // get sort filters
    if ("sort" in filters) {
        sort["sort"] = filters["sort"].escape();
    }
    
    return {
        search,
        pagination,
        sort
    };
}

async function get_book_by_id(id) {
    try {
        const result = await books_model.get_data_by_id(id);
        return result;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

String.prototype.escape = function () {
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&apos;",
    '"': "&quot;"
  };
  return this.replace(/[&<>\'\"]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
};

/**
 * CRUD
 */
async function get_books(req,res) {
    try {
        console.log(req.body);
        
        const filters = req.query;
        const fields = await dbviews_model.get_book_and_genre_field_name();
        const total_data = await books_model.get_all_data();
        const generated_filters = generate_filters(filters, fields);

        const new_filters = {
            search: generated_filters.search,
            pagination: generated_filters.pagination,
            sort: generated_filters.sort
        };

        const result = await books_model.get_data_custom(new_filters, total_data.length);
        // res.send(result);
        return myResponse.response(res, "success", result, 200, "Ok!");
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, "Internal Server Error")
    }
}

async function post_book(req,res) {
    try {
        const fieldToPatch = Object.keys(req.body);
        const error = await validate.validate_books(req.body, fieldToPatch);
        const body = req.body;
        const data = {
            ...body,
            book_image: req.file.filename
        }
        const result = await books_model.add_data(data);
        if (result.affectedRows > 0) {
            return myResponse.response(res, "success", data, 201, "Created!");
        } else {
            if (fs.existsSync(global.appRoot + '/' + path + data.book_image)) {
                try {
                    fs.unlinkSync(global.appRoot + '/' + path + data.book_image);
                } catch (error) {
                    console.log(error);
                }
            }
            return myResponse.response(res, "failed", data, 404, "Not Found!");
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, "Internal Server Error")
    }
}

async function patch_book(req,res) {
    try {
        const fieldToPatch = Object.keys(req.body);
        const error = await validate.validate_books(req.body, fieldToPatch);

        const id = req.params.id;
        const old_data = await get_book_by_id(id);
        const body = req.body;
        const data = {
            ...body,
            book_image: req.file.filename
        }
        const result = await books_model.update_data(data, id);

        const newData = {
            book_id: id,
            ...data
        }

        if (result.affectedRows > 0) {
            if (fs.existsSync(global.appRoot + '/' + path + old_data[0].book_image)) {
                try {
                    fs.unlinkSync(global.appRoot + '/' + path + old_data[0].book_image);
                } catch (error) {
                    console.log(error);
                }
                return myResponse.response(res, "success", newData, 200, "Updated!");
            }
        } else {
            return myResponse.response(res, "failed", newData, 404, "Not Found!");
        }

    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, "Internal Server Error")
    }
}

async function delete_book(req,res) {
    try {
        const id = req.params.id;
        const result = await books_model.delete_data(id);

        const data = {
            book_id: id
        }

        if (result.affectedRows > 0){
            return myResponse.response(res, "success", data, 200, "Deleted!");
        } else {
            return myResponse.response(res, "failed", data, 404, "Not Found!");
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, "Internal Server Error")
    }
}

module.exports = {
    post_book,
    patch_book,
    delete_book,
    get_books
}