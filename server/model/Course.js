const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
    },
    instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    tag:{
        type:[String],
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    instructions: {
        type:[String],
    },

	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
}, { timestamps: true });


module.exports = mongoose.model("Course",courseSchema);