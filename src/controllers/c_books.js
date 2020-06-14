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

// import joi
const validate = require('../helpers/joi_schema');

// import config
const config = require('../configs/global');

// import custom error message
const error_message = require("../helpers/my_error_message");

// import delete
const delete_image = require("../helpers/delete_image");

/**
 * Custom Function
 */
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
        if (filters.page || filters.limit) {
            pagination[filter] = filters[filter].escape();
        }
    }
    
    // get sort filters
    if(filters.sort) {
        sort.sort = (filters.sort).escape();
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
        return my_response.response(res, "success", result, 200, "Ok!");
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

async function post_book(req,res) {
    try {
        if (req.file) {
            // Joi validation
            const field_to_patch = Object.keys(req.body);
            await validate.validate_books(req.body, field_to_patch);

            const data = req.body;
            const check_book = await books_model.get_data_by_name(data.book_title);
            
            if (check_book.length < 1) {
                data.book_image = `${config.image_url_path(req)}${req.file.filename}`;
                const result = await books_model.add_data(data);
                if (result.affectedRows > 0) {
                    data.book_id = result.insertId;
                    return my_response.response(res, "success", data, 201, "Created!");
                } else {
                    // delete new image when insert data is failed
                    const my_request = { protocol: req.protocol, host: req.get('host') }
                    delete_image.delete(my_request, req.file.filename);

                    const message = `Add data failed`;
                    return my_response.response(res, "failed", "", 409, message);
                }
            } else {
                const message = `Duplicate data ${data.book_title}`;
                return my_response.response(res, "failed", "", 409, message);
            }
        } else {
            const message = `There is no file to upload`;
            return my_response.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);
        
        // delete image when error
        const my_request = { protocol: req.protocol, host: req.get('host') }
        delete_image.delete(my_request, req.file.filename);

        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
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
                const my_request = { protocol: req.protocol, host: req.get('host') }
                delete_image.delete(my_request, old_data[0].book_image);
                return my_response.response(res, "success", newData, 200, "Updated!");
            } else {
                // delete new image when update data is failed
                const my_request = { protocol: req.protocol, host: req.get('host') }
                delete_image.delete(my_request, req.file.filename);

                const message = `Update data ${data.book_title} failed `;
                return my_response.response(res, "failed", "", 500, message);
            }
        } else {
            const message = `There is not file to upload `;
            return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
        }
    } catch (error) {
        console.log(error);

        // delete image when error
        const my_request = { protocol: req.protocol, host: req.get('host') }
        delete_image.delete(my_request, req.file.filename);

        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

async function delete_book(req,res) {
    try {
        const id = req.params.id;
        const old_data = await get_book_by_id(id);
        const result = await books_model.delete_data(id);
        
        const data = {book_id: id}
        if (result.affectedRows > 0){
            const my_request = { protocol: req.protocol, host: req.get('host') }
            delete_image.delete(my_request, old_data[0].book_image);
            return my_response.response(res, "success", data, 200, "Deleted!");
        } else {
            const message = `Delete data ${data.book_title} failed `;
            return my_response.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);
        return my_response.response(res, "failed", "", 500, error_message.my_error_message(error, {}));
    }
}

module.exports = {
    post_book,
    patch_book,
    delete_book,
    get_books
}