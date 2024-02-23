const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//forgot / reset password

// step 1 send link on mail
// update in DB

exports.resetPasswordlink = async(req,res)=>{
    try {
        
        // fetch email
        const {email} = req.body;

        // check user exist or not validation
        const user = await User.findOne({email});
        if(!user){
            return res.status(402).json({
                success: false,
                message: "user is not registered",
            });
        }  

        // generate token
        const token = crypto.randomUUID();

        // update token and expire time in user
        const updatedUser = await User.findOneAndUpdate({email},
                                    {token:token,
                                    tokenExpire:Date.now() + 5*60*1000},
                                    {new:true});

        // make url
        const url = `http://localhost:3000/updatepassword/${token}`;

        // send mail
        const mail = await mailSender(email,"password reset link",
                        `password reset link : ${url}`);
        

        return res.status(200).json({
            success: true,
            body:mail,
            message: "rest password mail send successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while sending rest password link",
            error,
        });
    }
}


// to reset password we need user so wee search on basis of token which present in url 
exports.resetPassword = async (req,res)=>{
    try {
        
        // data fetch
        const{token,password,confirmPassword} = req.body;

        // validate
        if (
            !password ||
            !confirmPassword ||
            !token
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
      
        // check in DB
        const existUser = await User.findOne({ token });

        // if token not available means no mail has been send
        if (!existUser) {
            return res.status(401).json({
            success: false,
            message: "Invalid token for reset password",
            });
        }

        // else if time expire
        if(existUser.tokenExpire < Date.now()){
            return res.status(401).json({
                success: false,
                message: "Reset password token is expired",
                });
        }

        // every thing OK Hash password
        const hashPassword = await bcrypt.hash(password,10);

        // update in DB 
        const updatedUser = await User.findByIdAndUpdate(existUser._id,
                            {password:hashPassword},
                            {new:true});

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while rest password",
            error,
        });
    }
}