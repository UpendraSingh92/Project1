const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        trim:true,
        required:true,
    },
    subSections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection",
            required:true,
        }
    ],
});


module.exports = mongoose.model("Section",sectionSchema);