/**
 * Model
 * .
 * Load Model
 */
const booksModel = require("../models/m_books");
const dbViewsModel = require("../models/m_dbviews");

/**
 * custom response helper
 * .
 * merapihkan output
 * response: function(res, statusExecution, data, statusCode, message)
 */
const myResponse = require("../helpers/myResponse");

// import joi
const validate = require('../helpers/joiSchema');

// import config
const config = require('../configs/global');

// import custom error message
const errorMessage = require("../helpers/myErrorMessage");

// import delete
const deleteImage = require("../helpers/deleteImage");



/**
 * Custom Function
 */
function generateFilters(filters = {}, fields = {}) {
    let search = {};
    let pagination = {};
    let sort = {};
    
    // get search filters
    for (field in fields) {
        // ambil field name
        const fieldName = fields[field];

        for (filter in filters) {
            // masukin ke search
            if (filter == fieldName) {
                if (filter in search == false) {
                    search[filter] = filters[filter];
                }
            }
            if (filter == "genre" && "name" == fieldName) {
                if (filter in search == false) {
                    search["name"] = filters[filter];
                }
            }
        }
    }

    // get pagination filters
    if ((filters.page && filters.page > 0) && (filters.limit && filters.limit > 0)) {
        pagination['page'] = filters.page;
        pagination['limit'] = filters.limit;
    }
    
    // get sort filters
    if(filters.sort && filters.sort.length > 0) {
        sort.sort = (filters.sort);
    }
    
    return {
        search,
        pagination,
        sort
    };
}

async function getBookById(id = 0) {
    try {
        const result = await booksModel.getDataById(id);
        return result;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

/**
 * CRUD
 */
async function getBooks(req,res) {
    try {
        const filters = req.query;
        
        const fields = await dbViewsModel.getBookAndGenreFieldName();
        const totalData = await booksModel.getAllData();
        const generatedFilters = generateFilters(filters, fields);
        
        const newFilters = {
            search: generatedFilters.search,
            pagination: generatedFilters.pagination,
            sort: generatedFilters.sort
        };

        const result = await booksModel.getDataCustom(newFilters, totalData.length);
        
        return myResponse.response(res, "success", result, 200, "Ok!");
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

async function postBook(req,res) {
    try {
        if (req.file) {
            // Joi validation
            const fieldToPatch = Object.keys(req.body);
            await validate.validateBooks(req.body, fieldToPatch);

            const data = req.body;
            const checkBook = await booksModel.getDataByTitle(data.title);
            
            if (checkBook.length > 0) {
                // delete new image when duplicated data
                const myRequest = { protocol: req.protocol, host: req.get('host') }
                deleteImage.delete(myRequest, req.file.filename);

                const message = `Duplicate data ${data.title}`;
                return myResponse.response(res, "failed", "", 409, message);   
            }

            data.image = `${config.imageUrlPath(req)}${req.file.filename}`;
            const result = await booksModel.addData(data);
            if (result.affectedRows > 0) {
                data.bookId = result.insertId;
                return myResponse.response(res, "success", data, 201, "Created!");
            } else {
                // delete new image when insert data is failed
                const myRequest = { protocol: req.protocol, host: req.get('host') }
                deleteImage.delete(myRequest, req.file.filename);

                const message = `Add data failed`;
                return myResponse.response(res, "failed", "", 409, message);
            }

        } else {
            const message = `There is no image to upload`;
            return myResponse.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);
        
        // delete image when error
        const myRequest = { protocol: req.protocol, host: req.get('host') }
        deleteImage.delete(myRequest, req.file.filename);

        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

async function patchBook(req,res) {
    try {
        if (req.file) {
            const fieldToPatch = Object.keys(req.body);
            const error = await validate.validateBooks(req.body, fieldToPatch);

            const id = req.params.id;
            const oldData = await getBookById(id);
            if (oldData.length < 1) {
                const message = `Data with id ${id} not found`;
                return myResponse.response(res, "failed", "", 404, message);
            }
            
            const body = req.body;
            const checkBook = await booksModel.getDataByTitle(body.title);
            
            if(checkBook.length > 0) {
                // delete new image when duplicated data
                const myRequest = { protocol: req.protocol, host: req.get('host') }
                deleteImage.delete(myRequest, req.file.filename);

                const message = `Duplicate data ${body.title}`;
                return myResponse.response(res, "failed", "", 409, message);   
            }

            let data = {};
            if (req.file) {
                data = {
                    ...body,
                    image: req.file.filename,
                };
            } else {
                data = {
                    ...body
                };
            }

            const result = await booksModel.updateData(data, id);

            const newData = {
                bookId: id,
                ...data,
            };

            if (result.affectedRows > 0) {
                // delete old image
                const myRequest = { protocol: req.protocol, host: req.get('host') }
                deleteImage.delete(myRequest, oldData[0].image);
                return myResponse.response(res, "success", newData, 200, "Updated!");
            } else {
                // delete new image when update data is failed
                const myRequest = { protocol: req.protocol, host: req.get('host') }
                deleteImage.delete(myRequest, req.file.filename);

                const message = `Update data ${data.title} failed `;
                return myResponse.response(res, "failed", "", 500, message);
            }
        } else {
            const message = `There is no image to upload`;
            return myResponse.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);

        // delete image when error
        const myRequest = { protocol: req.protocol, host: req.get('host') }
        deleteImage.delete(myRequest, req.file.filename);

        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

async function deleteBook(req,res) {
    try {
        const id = req.params.id;
        const oldData = await getBookById(id);
        if(oldData.length < 1) {
            const message = `Data with id ${id} not found`;
            return myResponse.response(res, "failed", "", 404, message);
        }
        const result = await booksModel.deleteData(id);
        if (result.affectedRows > 0){
            const data = {bookId: id}
            const myRequest = { protocol: req.protocol, host: req.get('host') }
            deleteImage.delete(myRequest, oldData[0].image);
            return myResponse.response(res, "success", data, 200, "Deleted!");
        } else {
            const message = `Internal Server Error`;
            return myResponse.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

/**
 * Another CRUD
 */
async function borrowBook(req, res) {
    try {
        const id = req.params.id;
        const oldData = await getBookById(id);

        if (oldData.length < 1) {
            const message = `Data with id ${id} not found`;
            return myResponse.response(res, "failed", "", 404, message);
        }
        
        if (oldData[0].bookStatus == 1) {
            const message = `Book with id ${oldData[0].bookId} has been borrowed`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const data_to_update = {
            bookStatus: 1
        };
        
        const result = await booksModel.updateData(data_to_update, id);

        if (result.affectedRows > 0) {
            const new_data = {
                ...oldData[0]
            };
            return myResponse.response(res, "success", new_data, 200, "Borrowed!");
        } else {
            const message = `Update data ${oldData[0].title} failed `;
            return myResponse.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}
async function returnBook(req, res) {
    try {
        const id = req.params.id;
        const oldData = await getBookById(id);

        if (oldData.length < 1) {
            const message = `Data with id ${id} not found`;
            return myResponse.response(res, "failed", "", 404, message);
        }

        if (oldData[0].bookStatus == 0) {
            const message = `Book with id ${oldData[0].bookId} has been returned`;
            return myResponse.response(res, "failed", "", 409, message);
        }

        const data_to_update = {
            bookStatus: 0
        };

        const result = await booksModel.updateData(data_to_update, id);

        if (result.affectedRows > 0) {
            const data = {
                bookId: oldData[0].bookId
            };
            
            return myResponse.response(res, "success", data, 200, "Returned!");
        } else {
            const message = `Update data ${oldData[0].title} failed `;
            return myResponse.response(res, "failed", "", 500, message);
        }
    } catch (error) {
        console.log(error);
        return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
    }
}

module.exports = {
    postBook,
    patchBook,
    deleteBook,
    getBooks,
    borrowBook,
    returnBook
}