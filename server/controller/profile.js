const Profile = require("../model/Profile");
const User = require("../model/User");
const Course = require("../model/Course");
const { cloudinaryFileUpload } = require("../utils/fileUpload");
const CourseProgress = require("../model/CourseProgress");

// update profile because we already created when we create user and give all value are null so now we need to update
exports.updateProfile = async (req,res)=>{
    try {
        
        // fetch data
        const {gender, dateOfBirth="", contactNumber, about=""} = req.body;
        const userId = req.user.id;

        // validate data
        if(!gender || !contactNumber ){
            return res.status(401).json({
                success: false,
                message: "Please fill all detail in profile",
            });
        }
        
        // fetch profile id and data
        const user = await User.findById(userId);
        const profileId = user.additionalDetail;
        const profileData = await Profile.findById(profileId);

        profileData.gender = gender;
        profileData.dateOfBirth =dateOfBirth;
        profileData.contactNumber =contactNumber;
        profileData.about =about;

        // save in DB
        await profileData.save();

        // second method
        // const newProfile = await Profile.findByIdAndUpdate(profileId,{gender,dateOfBirth, contactNumber, about });

        // update in profile by insert this id in user

        const userdata = await User.findById(userId).populate("additionalDetail").exec();
        res.status(200).json({
            success: true,
            message: "Profile created successfully",
            body:userdata,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while creating Profile",
            error,
        });
    } 
}


// delete account
exports.deleteProfile = async (req,res)=>{
    try {
        
        // fetch data
        const userId = req.user.id;

        // find profile id to delete before deleting user
        const user = await User.findById(userId);
        const profileId = user.additionalDetail;
        await Profile.findByIdAndDelete(profileId);
        const updateduser = await User.findByIdAndDelete(userId,{new:true});

        // TODO : remove student from enrolled courses
        // how can we schedule deleting an account --> CRON jobs
        // TODO: Find More on Job Schedule
		    // const job = schedule.scheduleJob("10 * * * * *", function () {
    		// 	console.log("The answer to life, the universe, and everything!");
		    // });
        res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
            body:updateduser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while deleting Profile",
            error,
        });
    }
}

exports.getUserAllDetails = async (req,res)=>{
    try {
        
        // fetch user id
        const userId = req.user.id;

        // find profile id and fetch profile
        const user = await User.findById(userId).populate("additionalDetail").exec();

        res.status(200).json({
            success: true,
            message: "user data fetch successfully",
            body:user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while fetching Profile details",
            error,
        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      // console.log(res);
      const userId = req.user.id
      const image = await cloudinaryFileUpload(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        100
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:"something went wrong while update Profile picture",
        error: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      }).populate({
        path: "course",
        populate : {
          path: "courseContent",
          populate : {
            path : "subSections",
          }
        }
      }).exec()

      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: `Could not find user with id: ${userId}`,
        })
      }
      
      userDetails = userDetails.toObject();
      for (var i = 0; i < userDetails.course.length; i++){
        let subsecLength = 0;
        //console.log(userDetails.course[i].courseContent);
        subsecLength = userDetails.course[i].courseContent.reduce((acc,curr) => 
          (acc + curr.subSections.length),0);

        let progressCount = await CourseProgress.findOne({
          courseId: userDetails.course[i]._id,
          userId: userId,
        });

        let completed = progressCount.completedVideos.length;
        // console.log(completed,subsecLength);
        userDetails.course[i].progressPercentage = Math.round((completed / subsecLength) * 100 )
      }

      //console.log(userDetails.course[0]);
      return res.status(200).json({
        success: true,
        data: userDetails.course,
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

exports.instructorDashboard = async(req,res) => {
  try {
    const userId = req.user.id;
    const courseDetail = await Course.find({instructor:userId});
    const courseData = courseDetail.map((course) => {
      const totalStudent = course.studentEnrolled.length;
      const totalamount = totalStudent * course.price;

      // final object with additional details
      const courseWithStats = {
        courseId : course._id,
        courseName : course.courseName,
        description : course.description,
        totalStudent,
        totalamount,
      }

      return courseWithStats;
    });

    return res.status(200).json({
      success: true,
      message: "instructor Dashboard data fetched",
      data: courseData,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error in instructor dashboard",
      error: error.message,
    })
  }
}