const { instance } = require("../config/razorpay");
const User = require("../model/User");
const Course = require("../model/Course");
const mailSender = require("../utils/mailSender");
const mailTemplate = require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose");

// mail template

// capture payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
    
    try {
        
        // fetch course and student id
        const {courseId} = req.body;
        const userId = res.user.id;
        // validate

        if(!courseId){
            res.status(401).json({
                sucess: false,
                message: "Invalid Course Id",
            });
        }

        let course;
        course = await Course.findById(courseId);

        if(!course){
            res.status(404).json({
                sucess: false,
                message: "Course Data Not Found",
            });
        }

        // NOTE we have stored user id in form of string convert it in to Object
        const userObjId = mongoose.Types.ObjectId(userId);

        // user already purchased or not
        if(course.studentEnrolled.includes(userObjId)){
            res.status(301).json({
                sucess: false,
                message: "User already enrolled in course",
            });
        }

        // create order and send response 

        // 1. order options
        const amount = course.price;
        const currency = "INR";

        const option = {
            amount : amount * 100,
            currency,
            receipt : (Date.now()).toString(),
            notes:{
                courseId,
                userId,
            }
        }

        // 2.payment of order
        const orderResponse = await instance.orders.create(option);
        console.log(orderResponse);

        res.status(200).json({
            sucess: true,
            message: "Order created sucessful",
            courseName : course.courseName,
            courseDescription : course.description,
            thumbnail : course.thumbnail,
            orderId : orderResponse.id,
            currency,
            amount : amount ,

        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while Creating course order",
            error,
        });
    }
};


// signature verify
exports.signatureVerify = async(req,res)=>{

    const webHookSecretKey = "12543";
    
    // razorpay behaviour
    const signature = req.headers[x-razorpay-signature];

        // Hash-based message authentication code (or HMAC) 
        // it is a cryptographic authentication technique that uses a hash function and  **a secret key** .
        
        const shaSum = crypto.createHmac("sha256",webHookSecretKey)
        
        // convert shaSum object in to string form
        shaSum.update(JSON.stringify(req.body));
        // when we apply hash func on value ouput is known as digest
        const digest = shaSum.digest("hex")
        
        // match signature
        if(digest == signature){
            console.log("payment is authorize");
            const{courseId,userId} = req.body.payload.payment.entity.notes;
            
        try {
            
            // find course and then enrolled student
            const enrollCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push:{
                        studentEnrolled:userId,
                    }
                },{new:true});

            if(!enrollCourse){
                res.status(500).json({
                    sucess: false,
                    message: "course not found while enrolling student",
                });
            }
            console.log(enrollCourse);


            // find student and enrolled in course
            const enrollStudent = await User.findByIdAndUpdate(userId,
                {
                    $push:{
                        course:courseId,
                    }
                },{new:true});

            if(!enrollStudent){
                res.status(500).json({
                    sucess: false,
                    message: "student not found while enrolling in course",
                });
            }
            console.log(enrollStudent);

            // mail send
            const mailRes = mailSender(enrollStudent.email
                                        ,"Congratulation You Enrolled in WebDev Course sucessfully",
                                        mailTemplate(enrollCourse.courseName,enrollStudent.firstName +" "+enrollStudent.lastName));

            console.log(mailRes);
            res.status(400).json({
                sucess: true,
                message: "signature verified and Course purchase sucessfully",
            });

        } catch (error) {
            res.status(500).json({
                sucess: false,
                message: "something went wrong while enrolling student",
                error,
            });
            }
        }
        else{
            // signature not matched
            res.status(500).json({
                sucess: false,
                message: "something went wrong while verifying signature", 
            });
        }
}