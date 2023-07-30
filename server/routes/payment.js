const express = require("express");
const router = express.Router();

// import controller of payment
const {capturePayment, signatureVerify} = require("../controller/payment");

// import middlewares
const {auth, isStudent} = require("../middleware/auth");

// define routes
router.post("/capturePayment",auth, isStudent, capturePayment);
router.post("/signatureVerify",signatureVerify);

module.exports = router;