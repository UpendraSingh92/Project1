const cloudinary = require("cloudinary").v2;
require("dotenv").config();


// need 3 things (parameter)
// 1. name
// 2. Api key
// 3. Api secret
exports.cloudinaryConnect = ()=> {
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
    } catch (error) {
        console.log(error);
    }
}