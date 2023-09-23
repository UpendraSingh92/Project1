const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    timeDuration:{
        type:String,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    
});


module.exports = mongoose.model("SubSection",subSectionSchema);