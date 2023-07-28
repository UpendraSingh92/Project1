const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        trim:true,
        required:true,
    },
    dateOfBirth:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        required:true,
        trim:true,
    },
    about:{
        type:String,
        trim:true,
    },
});


module.exports = mongoose.model("Profile",profileSchema);