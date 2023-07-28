const Profile = require("../model/Profile");
const User = require("../model/User");

// update profile because we already created when we create user and give all value are null so now we need to update
exports.updateProfile = async (req,res)=>{
    try {
        
        // fetch data
        const {gender, dateOfBirth="", contactNumber, about=""} = req.body;
        const userId = req.user.id;

        // validate data
        if(!gender || !contactNumber ){
            res.status(401).json({
                sucess: false,
                message: "Please fill all detail in profile",
            });
        }
        
        // fetch profile id and data
        const user = await User.findById(userId);
        const profileId = user.additionalDetail;
        const profileData = await Profile.findById(profileId);

        profileData.gender = gender;
        profileData.dateOfBirth =dateOfBirth;
        profileData.contactNumber =contactNumber;
        profileData.about =about;

        // save in DB
        await profileData.save();

        // second method
        // const newProfile = await Profile.findByIdAndUpdate(profileId,{gender,dateOfBirth, contactNumber, about });

        // update in profile by insert this id in user
        res.status(200).json({
            sucess: true,
            message: "Profile created sucessfully",
            body:profileData,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while creating Profile",
            error,
        });
    }
}


// delete account
exports.deleteProfile = async (req,res)=>{
    try {
        
        // fetch data
        const userId = req.user.id;

        // find profile id to delete before deleting user
        const user = await User.findById(userId);
        const profileId = user.additionalDetail;
        await Profile.findByIdAndDelete(profileId);
        const updateduser = await User.findByIdAndDelete(userId,{new:true});

        // TODO : remove student from enrolled courses
        // how can we schedule deleting an account --> CRON jobs
        res.status(200).json({
            sucess: true,
            message: "Profile deleted sucessfully",
            body:updateduser,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while deleting Profile",
            error,
        });
    }
}

exports.getUserAllDetails = async (req,res)=>{
    try {
        
        // fetch user id
        const userId = req.user.id;

        // find profile id and fetch profile
        const user = await User.findById(userId).populate("additionalDetail").exec();

        res.status(200).json({
            sucess: true,
            message: "user data fetch sucessfully",
            body:user,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while fetching Profile details",
            error,
        });
    }
}