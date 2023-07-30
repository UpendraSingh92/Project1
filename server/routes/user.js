const express = require("express");
const router = express.Router();

// import controller of user
const {
        login,
        signUp,
        sendOTP,
        changePassword
    } = require("../controller/auth");

// reset password controllers
const {
    resetPassword,
    resetPasswordlink
    } = require("../controller/resetPassword");

// import middlewares
const {auth} = require("../middleware/auth");


// *******************************************************************************
//                              Authentication routes
// *******************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// *******************************************************************************
//                              Reset Password routes
// *******************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordlink)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)
module.exports = router;