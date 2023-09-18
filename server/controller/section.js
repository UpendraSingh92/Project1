const Course = require("../model/Course");
const Section = require("../model/Section");

// create section
exports.createSection = async(req,res)=>{
    try {

        // fetch data
        const {sectionName,courseId} = req.body;

        // validate data
        if(!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Please fill all details in section",
            });
        }

        // create entry in DB
        const newSection = await Section.create({sectionName});

        // update section in course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },{new:true})
            .populate({
                path:"courseContent",
                    populate:{
                        path:"subSections",
                    },
            }).exec();

        res.status(200).json({
            success: true,
            body:updatedCourse,
            message: "Section created successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while creating Section",
            error:error.message,
        });
    }
}


// update section (only name is in section)
exports.updateSection = async(req,res)=>{
    try {

        // fetch data
        const {sectionName,sectionId,courseId} = req.body;

        // validate data
        if(!sectionName || !sectionId) {
            return res.status(401).json({
                success: false,
                message: "Please fill all details in section",
            });
        }

        // update section name
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                    {sectionName:sectionName},{new:true});
        
        const courseNew = await Course.findOne({_id:courseId}).populate({
            path: "courseContent",
            populate:{
                path:"subSections",
            }
        }).exec();

        res.status(200).json({
            success: true,
            data:courseNew,
            message: "Section created successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while Updating Section",
            error,
        });
    }
}


// delete section
exports.deleteSection = async(req,res)=>{
    try {

        // fetch data
        const {courseID, sectionID} = req.body;

        // validate data
        if(!sectionID || !courseID) {
            return res.status(401).json({
                success: false,
                message: "Please fill all details in section",
            });
        }

        // remove section from course
        const updatedCourse = await Course.findByIdAndUpdate(courseID,
                                    {
                                        $pull:{
                                            courseContent:sectionID,
                                        }
                                    },{new:true}).populate({
                                        path: "courseContent",
                                        populate:{
                                            path:"subSections",
                                        }
                                    }).exec();

        // remove section
        await Section.findByIdAndDelete(sectionID);
        res.status(200).json({
            success: true,
            course:updatedCourse,
            message: "Section deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong while deleting Section",
            error,
        });
    }
}
