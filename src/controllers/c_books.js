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
 * response: function(res, status_execution, data, status_code, message)
 */
const my_response = require("../helpers/my_response");

// import fs
const fs = require('fs')
const path = 'src/assets/images/';
const image_path = global.appRoot + "/" + path;

// import joi
const validate = require('../helpers/joi_schema');

// import config
const config = require('../configs/global');

/**
 * Custom Function
 */
function delete_image(file_name = "") {
    if (fs.existsSync(image_path + file_name)) {
      try {
        fs.unlinkSync(image_path + file_name);
      } catch (error) {
        console.log(error);
      }
    }
}

function generate_filters(filters = {}, fields = {}) {
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

async function get_book_by_id(id = 0) {
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
        return my_response.response(res, "success", result, 200, "Ok!");
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, "Internal Server Error")
    }
}

async function post_book(req,res) {
    try {
        if (req.file) {
            const body = req.body;
            const field_to_patch = Object.keys(req.body);
            await validate.validate_books(req.body, field_to_patch);
            const data = {
              ...body,
              book_image: `${config.image_static_path(req)}${req.file.filename}`
            };
            const check_book = await books_model.get_data_by_name(data.book_title);
            console.log(check_book.length);
            
            if (check_book.length < 1) {
                const result = await books_model.add_data(data);
                if (result.affectedRows > 0) {
                    return my_response.response(res, "success", data, 201, "Created!");
                } else {
                    // delete new image when insert data is failed
                    delete_image(req.file.filename);
                    return my_response.response( res, "failed", data, 404, "Not Found!");
                }
            } else {
                const message = {
                    error: 'duplicate data',
                    message: `${data.book_title} is exists`
                }
                return my_response.response(res, "failed", "", 409, message);
            }
        } else {
            return my_response.response(res, "failed", "there is no files to upload", 500, "Internal Server Error");
        }
    } catch (error) {
        console.log(error);
        if ("joiError" in error) {
            // delete new image when validation error
            delete_image(req.file.filename);
            return my_response.response(res, "failed", error, 500, "Internal Server Error")
        }
        if ('sqlMessage' in error) {
            delete_image(req.file.filename);
            return my_response.response(res, "failed", "", 500, "Internal Server Error")
        }
        console.log(error);
        return my_response.response(res, "failed", error, 500, "Internal Server Error")
    }
}

async function patch_book(req,res) {
    try {
        if (req.file) {
            const field_to_patch = Object.keys(req.body);
            const error = await validate.validate_books(req.body, field_to_patch);

            const id = req.params.id;
            const old_data = await get_book_by_id(id);

            const body = req.body;
            const data = {
            ...body,
            book_image: req.file.filename,
            };
            const result = await books_model.update_data(data, id);

            const newData = {
            book_id: id,
            ...data,
            };

            if (result.affectedRows > 0) {
                // delete old image
                delete_image(old_data[0].book_image);
                return my_response.response(res, "success", newData, 200, "Updated!");
            } else {
                // delete new image when update data is failed
                delete_image(req.file.filename);
                return my_response.response(res, "failed", newData, 404, "Not Found!");
            }
        } else {
            return my_response.response(res, "failed", "there is no files to upload", 500, "Internal Server Error");
        }
    } catch (error) {
        console.log(error);
        if ("joiError" in error) {
            // delete new image when validation error
            delete_image(req.file.filename);
            return my_response.response(res, "failed", error, 500, "Internal Server Error")
        }
        if ('sqlMessage' in error) {
            delete_image(req.file.filename);
            return my_response.response(res, "failed", "", 500, "Internal Server Error")
        }
        return my_response.response(res, "failed", error, 500, "Internal Server Error")
    }
}

async function delete_book(req,res) {
    try {
        const id = req.params.id;
        const result = await books_model.delete_data(id);
        const data = {book_id: id}
        if (result.affectedRows > 0){
            return my_response.response(res, "success", data, 200, "Deleted!");
        } else {
            return my_response.response(res, "failed", data, 404, "Not Found!");
        }
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, "Internal Server Error")
    }
}

module.exports = {
    post_book,
    patch_book,
    delete_book,
    get_books
}