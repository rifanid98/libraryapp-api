/**
 * Model
 * .
 * Load Model
 */
const books_model = require("../models/m_books");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

/**
 * Custom Function
 */

function generate_like(filters){
    
    let result = "";
    const length = Object.keys(filters).length -1;
    let i = 0;
    for (key in filters) {
        const filter = "'%" + filters[key] + "%'";
        let field = "book_" + key;
        if (key == "genre") {
            field = "book_" + key + "_name";
        }
        result += (i == length) ? field + " LIKE " + filter : field + " LIKE " + filter + " OR ";
        i++;
    }
    return result;
}

/**
 * CRUD
 */

async function get_books(req,res) {
    try {
        const filters = req.query;
        const filters_length = Object.keys(filters).length;
        let result;
        
        if (filters_length > 0) {
            if ("sort" in filters && "page" in filters && filters_length > 2) {
                result = "sort + page + search";
            }
            if ("sort" in filters && "page" in filters && filters_length == 2) {
                result = "sort + page";
            }
            if ("sort" in filters && "page" in filters == false && filters_length > 1) {
                result = "sort + search";
            }
            if ("sort" in filters && filters_length == 1) {
                result = "sort only";
            }
            if ("page" in filters && "sort" in filters == false && filters_length > 1) {
                result = "page + search";
            }
            if ("page" in filters && filters_length == 1) {
                result = "page + all_data ";
            }
        } else {
            result = "all_data only";
        }
        
        res.json(result);
        // return myResponse.response(res, "success", result, 200, "Ok!");
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error")
    }
}

async function post_book(req,res) {
    try {
        const data = req.body;
        const result = await books_model.add_data(data);
        console.log(data);
        
        return myResponse.response(res, "success", data, 200, "Ok!");
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error")
    }
}

async function patch_book(req,res) {
    try {
        const data =  req.body;
        const id = req.params.id;
        const result = await books_model.update_data(data, id);

        const newData = {
            book_id: id,
            ...data
        }
        if (result.affectedRows > 0) {
            return myResponse.response(res, "success", newData, 200, "Updated!");
        } else {
            return myResponse.response(res, "failed", newData, 404, "Not Found!");
        }
        
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", result, 500, "Internal Server Error")
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
        return myResponse.response(res, "failed", result, 500, "Internal Server Error")
    }
}

module.exports = {
    post_book,
    patch_book,
    delete_book,
    get_books
}