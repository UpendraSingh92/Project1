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
                        req.header("Authorization").replace("bearer ","") ;

        // if token missing
        if(!token){
            res.status(401).json({
                sucess: false,
                message: "Token is missing",
            });
        }

        try {
            const decodedToken =  jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decodedToken);
            res.user = decodedToken;
        } catch (error) {
            res.status(401).json({
                sucess: false,
                message: "Token not valid",
                error,
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while verify token",
            error,
        });
    }
}

// is Student
exports.isStudent = async(req,res,next)=>{
    try {

        if(req.user.accountType !== "Student"){
            res.status(401).json({
                sucess: false,
                message: "This is student protected route",
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "user role is not be verified",
            error,
        });
    }
}

// is instructor
exports.isInstructor = async(req,res,next)=>{
    try {

        if(req.user.accountType !== "Instructor"){
            res.status(401).json({
                sucess: false,
                message: "This is Instructor protected route",
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "user role is not be verified",
            error,
        });
    }
}

// is admin
exports.isAdmin = async(req,res,next)=>{
    try {

        if(req.user.accountType !== "Admin"){
            res.status(401).json({
                sucess: false,
                message: "This is Admin protected route",
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "user role is not be verified",
            error,
        });
    }
}