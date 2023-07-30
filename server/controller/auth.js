const User = require("../model/User");
const OTP = require("../model/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../model/Profile");
const jwt = require("jsonwebtoken");
const {mailSender} = require("../utils/mailSender")
require("dotenv").config();

// otp Send for signUp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;

    // check if already exist or not
    const user = await User.findOne({ email });

    if (user) {
      res.status(401).json({
        sucess: false,
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

    res.status(200).json({
      sucess: true,
      message: "OTP send sucessful",
      OTP: otpBody,
    });} catch (error) {
    res.status(500).json({
      sucess: false,
      message: "error on sending Verifiation OTP",
      error,
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
      res.status(401).json({
        sucess: false,
        message: "please fill all detail",
      });
    }
    // match password
    if (password !== confirmPassword) {
      res.status(401).json({
        sucess: false,
        message: "Password not match with confirm Password",
      });
    }

    // check user exist or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(401).json({
        sucess: false,
        message: "User already exist",
      });
    }
    // find most recent otp
    // createdAt:-1 for decending

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length == 0) {
      // OTP not found
      res.status(401).json({
        sucess: false,
        message: "OTP not Found",
      });
    } 
    if (Number(otp) !== recentOtp.otp) {
      // match otp
      console.log(typeof(otp)," ",typeof(recentOtp.otp));
      return res.status(401).json({
        sucess: false,
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
    res.status(200).json({
      sucess: true,
      message: "SignUp Sucessful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
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
      res.status(401).json({
        sucess: false,
        message: "please fill all detail",
      });
    }

    // check user exist or not

    const user = await User.findOne({ email }).populate("additionalDetail").exec();

    if (!user) {
      return res.status(401).json({
        sucess: false,
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
        expiresIn: "2h",
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
        sucess: true,
        token,
        user,
        message: "Login sucessful",
      });
    }
    else{
        res.status(401).json({
            sucess: false,
            message: "Incorrect password",
        });
    }

  } catch (error) {
    res.status(500).json({
        sucess: false,
        message: "something went wrong while login",
        error,
    });
  }
};

// change Password
exports.changePassword = async(req,res)=>{
    try {
        
        // fetch data
        const {email,oldPassword,newPassword,confirmNewPassword} = req.body;
        
        // validation
        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            res.status(401).json({
                sucess: false,
                message: "please fill all details",
            });
        }
        // match confirm password
        if(newPassword !== confirmNewPassword){
            res.status(401).json({
                sucess: false,
                message: "new password and confirm password not match",
            });
        }

        // match old to save password
        const user = await User.findOne({email});
        const savePassword = user.password;
        
        if(! await bcrypt.compare(oldPassword,savePassword)){
            res.status(402).json({
                sucess: false,
                message: "Old password is Incorrect",
            });
        }

        // hash newpassword
        const newHashPassword = await bcrypt(newPassword,10);

        // update password and save 
        const updatedUser = await User.findByIdAndUpdate(user._id,{password:newHashPassword},{new:true});

        // send mail password change sucessful
        const mailResponse = await mailSender(email,"Password change sucessful","Your password has been change sucessfully");

        res.status(200).json({
            sucess: true,
            message: "Password change sucessfully",
            // updatedUser,
            updatedUser,
            mailResponse,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while changing password",
            error,
        });
    }
}