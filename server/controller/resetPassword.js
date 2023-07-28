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
            res.status(402).json({
                sucess: false,
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
        const url = `http://localhost3000/resetpassword/${token}`;

        // send mail
        const mail = await mailSender(email,"password reset link",
                        `passwor reset link : ${url}`);
        

        res.status(500).json({
            sucess: false,
            message: "rest password mail send sucessfully",
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
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
      
        // check in DB
        const existUser = await User.findOne({ token });

        // if token not available means no mail has been send
        if (!existUser) {
            res.status(401).json({
            sucess: false,
            message: "Invalid token for reset password",
            });
        }

        // else if time expire
        if(existUser.tokenExpire < Date.now()){
            res.status(401).json({
                sucess: false,
                message: "Reset password token is expired",
                });
        }

        // every thing OK Hash password
        const hashPassword = await bcrypt.hash(password,10);

        // update in DB 
        const updatedUser = await User.findByIdAndUpdate(existUser._id,
                            {password:hashPassword},
                            {new:true});

        res.status(200).json({
            sucess: true,
            message: "Password reset sucessfully",
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while rest password",
            error,
        });
    }
}