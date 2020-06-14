// import fs
const fs = require('fs')
const path = 'src/assets/images/';
const image_path = global.appRoot + "/" + path;
const config = require("../configs/global");

module.exports = {
    delete: function (my_request, file_name = "") {
        const new_file_name = file_name.split(`${my_request.protocol}://${my_request.host}/${config.root_project_path}/images/`).pop();
        const target_file = `${image_path}${new_file_name}`;
        
        if (fs.existsSync(target_file)) {
            try {
                fs.unlinkSync(target_file);
            } catch (error) {
                console.log(error);
            }
        }
    }
}