const User = require("../model/User");
const OTP = require("../model/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../model/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
const passwordUpdate = require("../mail/templates/passwordUpdate")
require("dotenv").config();

// otp Send for signUp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;

    // check if already exist or not
    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }

    // generate OTP
    let otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    // check otp is already exist or not
    let newotp = await OTP.findOne({ otp: otp });

    while (newotp) {
      otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });

      // check otp is already exist or not
      newotp = await OTP.findOne({ otp: otp });
    }

    const payload = { email, otp };

    const otpBody = await OTP.create(payload);
    // console.log(otpBody);

    return res.status(200).json({
      success: true,
      message: "OTP send successful",
      // OTP: otpBody,
    });} catch (error) {
    return res.status(500).json({
      success: false,
      message: "error on sending Verifiation OTP",
      error: error.message,
    });
  }
};

// sign up

exports.signUp = async (req, res) => {
  try {
    // fetch data
    const {
      firstName,
      lastName,
      email,
      accountType,
      password,
      confirmPassword,
      otp,
    } = req.body;

    console.log(firstName,
      lastName,
      email,
      accountType,
      password,
      confirmPassword,otp,"receive at backend");
    // velidate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !accountType ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "please fill all detail",
      });
    }
    // match password
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password not match with confirm Password",
      });
    }

    // check user exist or not
    const existUser = await User.findOne({ email });
    if (existUser) {
       return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }
    // find most recent otp
    // createdAt:-1 for decending

    const recentOtp = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);
    // const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    console.log(otp," yo1 ",recentOtp);
    if (recentOtp.length === 0) {
      // OTP not found
      return res.status(401).json({
        success: false,
        message: "OTP not Found",
      });
    } 

    if (Number(otp) !== recentOtp[0].otp) {
      // console.log(otp,recentOtp," yo ",recentOtp[0].otp,typeof(recentOtp[0].otp));
      // match otp
      return res.status(401).json({
        success: false,
        message: "OTP not Match",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // for additional detail create profile document and save
    const userProfile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });

    // store in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      accountType,
      password: hashPassword,
      additionalDetail: userProfile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    console.log("signup")
    return res.status(200).json({
      success: true,
      message: "SignUp successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong in signup try later",
      error,
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // fetch data

    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "please fill all detail",
      });
    }

    // check user exist or not

    const user = await User.findOne({ email }).populate("additionalDetail").exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    // match password
    if (await bcrypt.compare(password, user.password)) {
      // generate jwt token
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "10h",
      });

      const userResponse = user.toObject();
      userResponse.token = token;
      userResponse.password = undefined;

      // create cookie and send response

      const options = {
        expires: new Date(Date.now() + 3 * 60 * 60 * 24 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login successful",
      });
    }
    else{
        return res.status(401).json({
            success: false,
            message: "Incorrect password",
        });
    }

  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "something went wrong while login",
        error,
    });
  }
};

// change Password
exports.changePassword = async(req,res)=>{
    try {
        
        // fetch data
        const {oldPassword,newPassword,email} = req.body;
        
        // validation
        if(!email || !oldPassword || !newPassword ){
            return res.status(401).json({
                success: false,
                message: "please fill all details",
            });
        }

        // match old to save password
        const user = await User.findOne({email});
        const savePassword = user.password;
        
        if(! await bcrypt.compare(oldPassword,savePassword)){
          return res.status(402).json({
            success: false,
            message: "Old password is Incorrect",
          });
        }
        
        // hash newpassword
        const newHashPassword = await bcrypt.hash(newPassword,10);
        
        // update password and save 
        const updatedUser = await User.findByIdAndUpdate(user._id,{password:newHashPassword},{new:true});
        
        // send mail password change successful
        const mailResponse = await mailSender(email,"Password change successful",passwordUpdate(email,user.firstName));
        
        return res.status(200).json({
            success: true,
            message: "Password change successfully",
            // updatedUser,
            updatedUser,
            mailResponse,
        });

    } catch (error) {
      console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while changing password",
            error,
        });
    }
}