const express = require("express");
const router = express.Router();

// import controller of payment
const {capturePayment, signatureVerify, sendPaymentSuccessEmail} = require("../controller/payment");

// import middlewares
const {auth, isStudent} = require("../middleware/auth");

// define routes
router.post("/capturePayment",auth, isStudent, capturePayment);
router.post("/verifyPayment",auth, isStudent, signatureVerify);
router.post("/sendPaymentSuccessEmail",auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;