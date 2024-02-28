const express = require("express");
const router = express.Router();

//Course controllers
const { createCourse, showAllCourse, courseDetail, editCourse,deleteCourse,getFullCourseDetails,getInstructorCourses } = require("../controller/course");

// sectiom controller
const{createSection,deleteSection,updateSection} =  require("../controller/section");

// sub sectiom controller
const{createSubSection,updateSubSection,deleteSubSection} =  require("../controller/subSection");

// category controller
const{createCategory,categoryPageDetail,showAllCategory} =  require("../controller/categories");

// rating and review controller
const{avergeRating, createRating, getAllRating} =  require("../controller/ratingAndReview");

// importing Middlewares
const {auth ,isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// course Progress routes
const {updateCourseProgress} = require("../controller/courseProgress");

//********************************************************************************
//                                      Course routes
//********************************************************************************

// course only for instructor
router.post("/createCourse", auth, isInstructor, createCourse)

//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

// Get all Registered Courses
router.get("/showAllCourses", showAllCourse)

// Get Details for a Specific Courses
router.post("/getCourseDetails", courseDetail)
router.post("/getFullCourseDetails",auth, getFullCourseDetails)

// Edit Course routes
router.post("/edit-Course", auth, isInstructor, editCourse)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

// Delete a Course
router.delete("/deleteCourse", deleteCourse)

// *******************************************************************************
//                                      Category routes (Only by Admin)
// *******************************************************************************

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategory", showAllCategory)
router.post("/getCategoryPageDetail", categoryPageDetail)

// *******************************************************************************
//                                      Rating and Review
// *******************************************************************************

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", avergeRating)
router.get("/getReviews", getAllRating)


// *******************************************************************************
//                                    course Progress
// *******************************************************************************

router.post("/updatecourseprogress",auth,isStudent,updateCourseProgress);
module.exports = router;