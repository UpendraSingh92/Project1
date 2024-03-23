const Course = require("../model/Course");
const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const User = require("../model/User");
const Category = require("../model/Category");
const {cloudinaryFileUpload} = require("../utils/fileUpload");
const {convertSecondsToDuration} = require("../utils/secToDuration");
const CourseProgress = require("../model/CourseProgress");

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
        const thumbnail = req.files.thumbnail;
        
        // console.log(courseName, description, price, whatYouWillLearn, tag, instructions , category,status,thumbnail);
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
        
        // instructions
        let tempInstructions = await JSON.parse(instructions);
        //console.log(tempInstructions);
        
        // upload thumbnail
        const thumbnailImg = await cloudinaryFileUpload(thumbnail,process.env.FOLDER_NAME,);
        
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
            instructions:tempInstructions,
            status:status,
        }); 

        // add course in instructor schema--> what course instructor is created
        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            {
                $push:{
                    course:newCourse._id,
                }
                },{new:true});

        // add course in instructor schema--> what course instructor is created
        const updatedCategory = await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                    course:newCourse._id
                }
            },{new:true});

        console.log("category -------",category,newCourse._id,updatedCategory);
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

        let totalDurationInSeconds = 0
        fullCourse.courseContent.forEach((content) => {
          content.subSections.forEach((subSec) => {
            const timeDurationInSeconds = parseInt(subSec.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        res.status(200).json({
            success: true,
            course:fullCourse,
            totalDuration,
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

// update course
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body;
      const updates = req.body;
      console.log(courseId, req.body);
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetail",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSections",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

// full course fetched to show
exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      console.log("hiii",req.user);
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetail",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSections",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSections.forEach((subSec) => {
          const timeDurationInSeconds = parseInt(subSec.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
  
  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSections
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }