/**
 * My Custom Error
 */
const deleteImage = require("./deleteImage");

module.exports = {
    myErrorMessage: function (error, message) {
        var errorMessage = "Internal Server Error";
        
        if (Object.keys(error).length < 1 && Object.keys(message).length > 0) {
            var errorMessage = message;
        }
        if (Object.keys(error).length > 0 && Object.keys(message).length < 1) {
            if ('joiError' in error) {
                var errorMessage = error.message;
            }
            if ('sqlMessage' in error) {
                var errorMessage = error.sqlMessage;
            }
        }
        return errorMessage;
    }
}