/**
 * JOI!
 */
const Joi = require('joi');

/**
 * Custom Joi Error Handling
 */
function myJoiError(error = {}) {
    const joiError = error.error.details[0];
    const errorMessage = {
        joiError: 'joi',
        message: joiError.message
    };
    
    return errorMessage;
}

module.exports = {
    validateBooks: function(book, field = null) {
        const joiSchema = {
            // bookImage: Joi.required(),
            title: Joi.string().trim().min(3).required(),
            description: Joi.string().trim().min(3).required(),
            author: Joi.string().trim().min(3).required(),
            status: Joi.number().min(0).max(1).required(),
            genre_id: Joi.number().min(0).required()
        };

        if (!field) {
            return new Promise((resolve, reject) => {
                const error = Joi.validate(book, joiSchema);

                if (error.error != null) {
                  reject(myJoiError(error));
                }
                resolve();
            });
        } else {
            const dynamicSchema = Object.keys(joiSchema)
                .filter(key => field.includes(key))
                .reduce((obj, key) => {
                    obj[key] = joiSchema[key];
                    return obj;
                }, {});
            return new Promise((resolve, reject) => {
                const error = Joi.validate(book, dynamicSchema);

                if (error.error != null) {
                  reject(myJoiError(error));
                }
                resolve();
            });
        }
    },
    validateBookGenres: function (bookGenres) {
        const joiSchema = {
            name: Joi.string().trim().min(3).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(bookGenres, joiSchema);

            if (error.error != null) {
                reject(myJoiError(error));
            }
            resolve();
        });
    },
    validateRegister: function (userData) {
        const joiSchema = {
            username: Joi.string().trim().min(3).required(),
            password: Joi.string().trim().min(3).required(),
            role: Joi.number().min(1).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(userData, joiSchema);

           if (error.error != null) {
             reject(myJoiError(error));
           }
           resolve();
        });
    },
    validate_borrow: function (userData) {
        const joiSchema = {
            bookId: Joi.number().min(1).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(userData, joiSchema);

            if (error.error != null) {
                reject(myJoiError(error));
            }
            resolve();
        });
    },
    validateLogin: function (userData) {
        const joiSchema = {
            username: Joi.string().trim().min(3).required(),
            password: Joi.string().trim().min(3).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(userData, joiSchema);

            if (error.error != null) {
                reject(myJoiError(error));
            }
            resolve();
        });
    },
    validateRefreshToken: function (userData) {
        const joiSchema = {
            tokenRefresh: Joi.string().trim().min(3).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(userData, joiSchema);

            if (error.error != null) {
                reject(myJoiError(error));
            }
            resolve();
        });
    }
}
