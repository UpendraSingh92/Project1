const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplates = require("../mail/templates/emailVerificationTemplate")

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
        expires:20*60,
    },
});

// function to send mail 
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification email from StudyNotion",otpTemplates(otp));
        // console.log("email send sucessfully ",mailResponse);

    } catch (error) {
        console.log("error in sending otp email ",error);
        throw(error);
    }
};

// pre middleware
otpSchema.pre("save",async function(next){
    
    // console.log("entry created");
    if(this.isNew)
    await sendVerificationEmail(this.email,this.otp);

    next();
})

module.exports = mongoose.model("OTP",otpSchema);