const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth middleware
// authentication by verify token 

exports.auth = async(req,res,next)=>{
    try {

        // fetch token
        const token =   req.cookies.token ||
                        req.body.token ||
                        req.header("Authorization").replaceAll("bearer ","");

        // if token missing
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decodedToken =  jwt.verify(token,process.env.JWT_SECRET_KEY);
            // console.log(decodedToken);
            req.user = decodedToken;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token not valid",
                error,
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while verify token",
            error,
        });
    }
    console.log("pass by Auth middleware");
}

// is Student
exports.isStudent = async(req,res,next)=>{
    try {

        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is student protected route",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not be verified",
            error:error.message,
        });
    }
}

// is instructor
exports.isInstructor = async(req,res,next)=>{
    try {

        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is Instructor protected route",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not be verified",
            error:error.message,
        });
    }
}

// is admin
exports.isAdmin = async(req,res,next)=>{
    try {

        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is Admin protected route",
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user role is not be verified",
            error:error.message,
        });
    }
}