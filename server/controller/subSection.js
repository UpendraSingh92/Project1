// 45 min videoUrl
const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const {cloudinaryFileUpload} = require("../utils/fileUpload")


exports.createSubSection = async (req,res)=>{
    try {
        
        // fetch data
        const {title, description, timeDuration, sectionId} = req.body;

        // fetch video file
        const videoFile = req.files.CourseVideo;
        
        // validate data
        if(!title || !description || !timeDuration || !videoFile || !sectionId){
            res.status(401).json({
                sucess: false,
                message: "Please fill all detail in Sub-Section",
            });
        }

        // upload video file
        const response = await cloudinaryFileUpload(videoFile,process.env.FOLDER_NAME);

        // entry in DB
        const newSubSection = await SubSection.create(
                                                {title,
                                                description,
                                                timeDuration,
                                                videoUrl:response.secure_url
                                                });

        // update in section by insert sub-section id
        const section = await Section.findByIdAndUpdate(sectionId,
            {
                $push:{
                    subSections:newSubSection._id,
                }
            },{new:true}).populate("subSections").exec();
        
        res.status(200).json({
            sucess: true,
            message: "Sub-Section created sucessfully",
            body:section,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while creating Sub-Section",
            error,
        });
    }
}


exports.updateSubSection = async (req,res)=>{
    try {
        
        // fetch data
        const {title, description, timeDuration, sectionId} = req.body;

        // fetch video file
        const videoFile = req.files.CourseVideo;
        
        // validate data
        if(!title || !description || !timeDuration || !videoFile || !sectionId){
            res.status(401).json({
                sucess: false,
                message: "Please fill all detail in Sub-Section",
            });
        }

        // upload video file
        const response = await cloudinaryFileUpload(videoFile,process.env.FOLDER_NAME);

        // entry in DB
        const newSubSection = await SubSection.create(
                                                {title,
                                                description,
                                                timeDuration,
                                                videoUrl:response.secure_url
                                                });

        // update in section by insert sub-section id
        const section = await Section.findByIdAndUpdate(sectionId,
            {
                $push:{
                    subSections:newSubSection._id,
                }
            },{new:true}).populate("subSections").exec();
        
        res.status(200).json({
            sucess: true,
            message: "Sub-Section created sucessfully",
            body:section,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while Updating Sub-Section",
            error,
        });
    }
}