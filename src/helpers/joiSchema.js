/**
 * JOI!
 */
const Joi = require('joi');

/**
 * Custom Joi Error Handling
 */
function myError(error) {
    const joiError = error.error.details[0];
    const errorMessage = {
        joiError: 'joi',
        message: joiError.message
    };
    
    return errorMessage;
}

module.exports = {
    validate_books: function(book, field = null) {
        const joiSchema = {
            book_title: Joi.string().trim().min(3).required(),
            book_description: Joi.string().trim().min(3).required(),
            // book_image: Joi.required(),
            book_author: Joi.string().trim().min(3).required(),
            book_status: Joi.number().min(0).max(1).required(),
            book_genre_id: Joi.number().min(0).required()
        };

        if (!field) {
            return new Promise((resolve, reject) => {
                const error = Joi.validate(book, joiSchema);

                if (error.error != null) {
                  reject(myError(error));
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
                const error = Joi.validate(book, joiSchema);

                if (error.error != null) {
                  reject(myError(error));
                }
                resolve();
            });
        }
    },
    validate_book_genres: function (book_genres) {
        const joiSchema = {
            book_genre_name: Joi.string().trim().min(3).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(book_genres, joiSchema);

            if (error.error != null) {
                reject(myError(error));
            }
            resolve();
        });
    },
    validate_register: function (user_data) {
        const joiSchema = {
            user_name: Joi.string().trim().min(3).required(),
            user_password: Joi.string().trim().min(3).required(),
            user_role: Joi.number().min(1).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(user_data, joiSchema);

           if (error.error != null) {
             reject(myError(error));
           }
           resolve();
        });
    },
    validate_login: function (user_data) {
        const joiSchema = {
            user_name: Joi.string().trim().min(3).required(),
            user_password: Joi.string().trim().min(3).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(user_data, joiSchema);

            if (error.error != null) {
                reject(myError(error));
            }
            resolve();
        });
    },
    validate_refresh_token: function (user_data) {
        const joiSchema = {
            token_refresh: Joi.string().trim().min(3).required()
        };

        return new Promise((resolve, reject) => {
            const error = Joi.validate(user_data, joiSchema);

            if (error.error != null) {
                reject(myError(error));
            }
            resolve();
        });
    }
}
