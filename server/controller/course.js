const Course = require("../model/Course");
const User = require("../model/User");
const Category = require("../model/Category");
const {cloudinaryFileUpload} = require("../utils/fileUpload");

// create course controller
exports.createCourse = async(req,res)=>{
    try {

        // fetch data
        const {courseName, description, price, whatYouWillLearn, tag, instructions ,status, category} = req.body;

        // handle status
        if (!status || status === undefined) {
			status = "Draft";
		}

        // featch thumbnai file
        const thumbnail = req.files.thumbnailImage;


        // validation
        if(!courseName || !description || !price || !whatYouWillLearn || !category || !thumbnail || !tag || !instructions || !status){
            res.status(401).json({
                sucess: false,
                message: "plaease fill all details",
            });
        }

        // user validation
        const userID = req.user.id;
        const instructor = await User.findById(userID);
        if(!instructor){
            res.status(401).json({
                sucess: false,
                message: "user detail not found",
            });
        }

        // fetch category
        const userCategory = await Category.findById(category);
        if(!userCategory){
            res.status(500).json({
                sucess: false,
                message: "Category is Not Valid",
            });
        }
        
        // upload thumbnail
        const thumbnaiImg = cloudinaryFileUpload(thumbnail,process.env.FOLDER_NAME,);

        // create entry in DB 
        const newCourse = await Course.create({
            courseName,
            description,
            whatYouWillLearn,
            price,
            category:userCategory,
            thumbnail:thumbnaiImg.secure_url,
            instructor:userID,
            tag,
            instructions,
            status,
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

            res.status(200).json({
                sucess: true,
                message: "course created sucessfully",
                data:createCourse,
            });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while creating course",
            error,
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
            sucess: true,
            message: "courses fetched sucessfully",
            data:allCourse,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
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
            res.status(401).json({
                sucess: false,
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
            res.status(401).json({
                sucess: false,
                message: "Course full detail not found",
            });
        }

        res.status(200).json({
            sucess: true,
            course:fullCourse,
            message: "Course full detail fetch sucessful",
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while fetching course detail",
            error,
        });
    }
}