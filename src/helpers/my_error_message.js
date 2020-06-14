/**
 * My Custom Error
 */
const delete_image = require("../helpers/delete_image");

module.exports = {
    my_error_message: function (error, message) {
        var error_message = "Internal Server Error";
        
        if (Object.keys(error).length < 1 && Object.keys(message).length > 0) {
            var error_message = message;
        }
        if (Object.keys(error).length > 0 && Object.keys(message).length < 1) {
            if ('joiError' in error) {
                var error_message = error.message;
            }
            if ('sqlMessage' in error) {
                var error_message = error.sqlMessage;
            }
        }
        return error_message;
    }
}