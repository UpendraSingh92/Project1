const express = require("express");
const router = express.Router();

// import controller of Profile
const {
        updateProfile,
        deleteProfile,
        getUserAllDetails,
        getEnrolledCourses,
        updateDisplayPicture
        } = require("../controller/profile");

// import middlewares
const {auth} = require("../middleware/auth");

// define routes

// *******************************************************************************
//                                      Profile routes
// *******************************************************************************

router.delete("/deleteProfile",auth, deleteProfile)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getUserAllDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router;