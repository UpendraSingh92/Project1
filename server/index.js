const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/database");
const connectCloudinary = require("./config/cloud");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// import all routes
const courseRoute = require("./routes/course")
const paymentRoute = require("./routes/payment")
const profileRoute = require("./routes/profile")
const userRoute = require("./routes/user")

require("dotenv").config()
const PORT = process.env.PORT || 4000

//middleware
app.use(express.json());

app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/",
}));

app.use(cors({
    origin:process.env.FRONTEND_LINK,
    credentials:true,    
}))


// DB connection
connectDB.connect();

// cloudinary connect
connectCloudinary.cloudinaryConnect();

// mounting and adding routes
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/payment",paymentRoute);

// default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server started"
    })
})

app.listen(PORT,()=>{
    console.log("app is listening at port ",PORT);
})