// 45 min videoUrl
const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const {cloudinaryFileUpload} = require("../utils/fileUpload")


exports.createSubSection = async (req,res)=>{
    try {
        
        // fetch data
        const {title, description,  sectionId,} = req.body;

        // fetch video file
        const video = req.files.videoFile;
        
        // validate data
        if(!title || !description  || !video || !sectionId ){
            return res.status(401).json({
                success: false,
                message: "Please fill all detail in Sub-Section",
            });
        }

        // upload video file
        // const response = await cloudinaryFileUpload(video,process.env.FOLDER_NAME);
        let response = {secure_url:"dummy"}

        const timeDuration = `${response.duration}`
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
            success: true,
            message: "Sub-Section created successfully",
            body:section,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while creating Sub-Section",
            error,
        });
    }
}


exports.updateSubSection = async (req,res)=>{
    try {
        
        // fetch data
        const {title, description, subSectionId} = req.body;

        // fetch video file
        const subSec = await SubSection.findById(subSectionId);

        if(!subSec){
            return res.status(404).json({
                success: false,
                message: "Sub-Section not found",
            });
        }

        // validate data
        if (title !== undefined) {
            subSec.title = title
          }
      
        if (description !== undefined) {
            subSec.description = description
        }

        if(req.files && req.files.CourseVideo !== undefined){
            const videoFile = req.files.CourseVideo;
            const uploadDetails = await uploadImageToCloudinary(
                videoFile,
                process.env.FOLDER_NAME);

            subSec.videoUrl = uploadDetails.secure_url
            subSec.timeDuration = `${uploadDetails.duration}`
        }

        await subSec.save();
        
        res.status(200).json({
            success: true,
            message: "Sub-Section created successfully",
            body:subSec,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while Updating Sub-Section",
            error,
        });
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }