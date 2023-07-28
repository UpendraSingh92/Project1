const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
});

// function to send mail 
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification email from StudyNotion",otp);
        console.log("email send sucessfully ",mailResponse);

    } catch (error) {
        console.log("error in sending otp email ",error);
        throw(error);
    }
};

// pre middleware
otpSchema.pre("save",async function(next){

    await sendVerificationEmail(this.email,this.otp);

    next();
})

module.exports = mongoose.model("OTP",otpSchema);