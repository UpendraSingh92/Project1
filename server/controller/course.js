const Course = require("../model/Course");
const User = require("../model/User");
const Category = require("../model/Category");
const {cloudinaryFileUpload} = require("../utils/fileUpload");

// create course controller
exports.createCourse = async(req,res)=>{
    try {

        // fetch data
        const {courseName, description, price, whatYouWillLearn, tag, instructions , category} = req.body;

        let status = req.body.status;

        // handle status
        if (!status || status === undefined) {
            status = "Draft";
		}

        // featch thumbnai file
        const thumbnail = req.files.thumbnailImage;
        
        // validation
        
       if(!courseName || !description || !price || !whatYouWillLearn || !category || !thumbnail || !tag  ){
           return res.status(401).json({
               success: false,
               message: "plaease fill all details",
            });
        }
        
        // user validation
        const userID = req.user.id;
        const instructor = await User.findById(userID);
        if(!instructor){
            return res.status(401).json({
                success: false,
                message: "user detail not found",
            });
        }
        
        // fetch category
        const userCategory = await Category.findById(category);
        if(!userCategory){
            return res.status(500).json({
                success: false,
                message: "Category is Not Valid",
            });
        }
        
        // upload thumbnail
        //const thumbnailImg = await cloudinaryFileUpload(thumbnail,process.env.FOLDER_NAME,);
        let thumbnailImg = {secure_url:"hfaf"}
        
        // create entry in DB 
        const newCourse = await Course.create({
            courseName,
            description,
            whatYouWillLearn,
            price,
            category: userCategory._id,
            thumbnail:thumbnailImg.secure_url,
            instructor: instructor._id,
            tag:tag,
            instructions,
            status:status,
        }); 

        // add course in instructor schema--> what course instructor is created
        const updatedUser = User.findByIdAndUpdate(req.user.id,
            {
                $push:{
                    course:newCourse._id,
                }
                },{new:true});

        // add course in instructor schema--> what course instructor is created
        const updatedCategory = Category.findByIdAndUpdate(category,
            {
                $push:{
                    course:newCourse._id
                }
            },{new:true});

            return res.status(200).json({
                success: true,
                message: "course created successfully",
                data:newCourse,
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong while creating course",
            error:error.message,
        });
    }
}

// fetch all course controller
exports.showAllCourse = async(req,res)=>{
    try {

        // fetch all course data
        const allCourse = await Course.find({}).populate("instructor").exec();
        
        /*
        .populate([
            "instructor",
            {
                path:"courseContent",
                populate:{
                    path:"subSections",
                },
            },
        ])
        .exec();
        */

        res.status(200).json({
            success: true,
            message: "courses fetched successfully",
            data:allCourse,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while fetching all course",
            error,
        });
    }
}

// after purchase show full course
exports.courseDetail = async(req,res)=>{
    try {
        
        // fetch data
        const {courseId} = req.body;

        // validate data
        if(!courseId ) {
            return res.status(401).json({
                success: false,
                message: "Please fill course details valid",
            });
        }

        const fullCourse = await Course.findById(courseId).
        populate({
            path:"instructor",
            populate:{
                path:"additionalDetail",
            }
        }).populate("category")
        .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections",
            },
        }).exec();

        if(!fullCourse){
            return res.status(401).json({
                success: false,
                message: "Course full detail not found",
            });
        }

        res.status(200).json({
            success: true,
            course:fullCourse,
            message: "Course full detail fetch successful",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while fetching course detail",
            error,
        });
    }
}