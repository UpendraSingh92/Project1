const { instance } = require("../config/razorpay");
const User = require("../model/User");
const Course = require("../model/Course");
const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
const paymentMail = require("../mail/templates/paymentMail");
const CourseProgress = require("../model/CourseProgress");

exports.capturePayment = async(req,res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.status(404).json({
            sucess:false,
            message:"No courses found on payment time",
        })
    }

    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(404).json({
                    sucess:false,
                    message:"one course not found on payment time",
                })
            }

            // check student is already enrolled or not
            const studentId = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(studentId)){
                return res.status(401).json({
                    sucess:false,
                    message:"Student is already enrolled in Course on payment time",
                })
            }

            totalAmount =+ course.price;
        } catch (error) {
            return res.status(404).json({
                sucess:false,
                message:"error occur on time of payment",
                error: error.message,
            })
        }
    }

    // 1. order options
    const currency = "INR";
    const option = {
        amount : totalAmount * 100,
        currency,
        receipt : (Date.now()).toString(),
        notes:{
            userId,
        }
    }

    try {
        const paymentResponse = await instance.orders.create(option);
        //console.log(paymentResponse);

        res.status(200).json({
            success: true,
            message: "Order created successful",
            response:paymentResponse,
            orderId : paymentResponse.id,
            currency,
            amount : paymentResponse.amount ,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while Creating course order",
            error: error.message,
            err: error
        });
    }
}


// signature verify
exports.signatureVerify = async(req,res)=>{
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id =  req.body.razorpay_payment_id;
    const razorpay_signature =  req.body.razorpay_signature;
    const courses = req.body.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
       !razorpay_payment_id ||
       ! razorpay_signature ||
       ! courses || ! userId){
        return res.status(500).json({
            sucess:false,
            message:"Payment fail some field in payment verify are missing",
        })
    }
    
    try {
        // syntax given in razorpay docs
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");
        if(expectedSignature == razorpay_signature){
            // enrolled the student

            await enrolled(courses, userId, res);
            return res.status(200).json({
                success: true,
                message:"payment Verified",
            })
        }
    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"payment verification failed",
            error:error,
        }) 
    }
}


// function to enrolled student
const enrolled = async(courses, userid, res) =>{

    for(const courseId of courses){
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push: {studentEnrolled:userid}},
                {new:true},
            );
    
            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"No courses found on verify time at enrolling",
                })
            }
    
            // create course progress 0
            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userid,
                completedVideos: [],
            });

            
            // also insert in user enrolled course
            const enrollStudent = await User.findByIdAndUpdate({_id:userid},
                                            {$push:{
                                                course:courseId,
                                                courseProgress: courseProgress._id,
                                            }},{new:true});
                                                        

            // send mail about enrolled
            const fullName = enrollStudent.firstName + " " + enrollStudent.lastName;
            const mailResponse = await mailSender(
                enrollStudent.email,
                `you sucessfully enrolled into ${enrolledCourse.courseName} course`,
                courseEnrollmentEmail(enrolledCourse.courseName,fullName),
            )
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "something went wrong while enrolling student in course",
                error:error.message,
            });
        }
    }
}

exports.sendPaymentSuccessEmail = async(req,res) => {
    try {
        const{orderId,amount,paymentId} = req.body;
    
        const userId = req.user.id;
    
        if(!orderId || !amount || !paymentId){
            return res.status(400).json({
                success:false,
                message:"please fill all details for Payment sucess eamil",
            })
        }
    
        const enrolledUser = await User.findById({_id:userId});
        const fullName = enrolledUser.firstName + " " + enrolledUser.lastName;
        await mailSender(
            enrolledUser.email,
            `Payment sucessful for Course`,
            paymentMail(fullName,(amount/100),orderId,paymentId),
        );
        
        return res.status(200).json({
            success:true,
            message: "mail send sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while sending mail for sucessful payment of course",
            error:error.message,
        });
    }

}

/*
only for single course buy

// capture payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
    
    try {
        
        // fetch course and student id
        const {courseId} = req.body;
        const userId = req.user.id;
        // validate

        if(!courseId){
            res.status(401).json({
                success: false,
                message: "Invalid Course Id",
            });
        }

        let course;
        course = await Course.findById(courseId);

        if(!course){
            res.status(404).json({
                success: false,
                message: "Course Data Not Found",
            });
        }

        // NOTE we have stored user id in form of string convert it in to Object
        const userObjId = mongoose.Types.ObjectId(userId);

        // user already purchased or not
        if(course.studentEnrolled.includes(userObjId)){
            res.status(301).json({
                success: false,
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
            success: true,
            message: "Order created successful",
            courseName : course.courseName,
            courseDescription : course.description,
            thumbnail : course.thumbnail,
            orderId : orderResponse.id,
            currency,
            amount : amount ,

        });

    } catch (error) {
        res.status(500).json({
            success: false,
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
                    success: false,
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
                    success: false,
                    message: "student not found while enrolling in course",
                });
            }
            console.log(enrollStudent);

            // mail send
            const mailRes = mailSender(enrollStudent.email
                                        ,"Congratulation You Enrolled in WebDev Course successfully",
                                        mailTemplate(enrollCourse.courseName,enrollStudent.firstName +" "+enrollStudent.lastName));

            console.log(mailRes);
            res.status(400).json({
                success: true,
                message: "signature verified and Course purchase successfully",
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "something went wrong while enrolling student",
                error,
            });
            }
        }
        else{
            // signature not matched
            res.status(500).json({
                success: false,
                message: "something went wrong while verifying signature", 
            });
        }

    }
*/