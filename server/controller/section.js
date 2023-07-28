const Course = require("../model/Course");
const Section = require("../model/Section");

// create section
exports.createSection = async(req,res)=>{
    try {

        // fetch data
        const {sectionName,courseId} = req.body;

        // validate data
        if(!sectionName || !courseId) {
            res.status(401).json({
                sucess: false,
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
            sucess: true,
            body:updatedCourse,
            message: "Section created sucessfully",
            error,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while creating Section",
            error,
        });
    }
}


// update section (only name is in section)
exports.updateSection = async(req,res)=>{
    try {

        // fetch data
        const {sectionName,sectionID} = req.body;

        // validate data
        if(!sectionName || !sectionID) {
            res.status(401).json({
                sucess: false,
                message: "Please fill all details in section",
            });
        }

        // update section name
        const updatedSection = await Section.findByIdAndUpdate(sectionID,
                                    {sectionName:sectionName},{new:true});

        res.status(200).json({
            sucess: true,
            body:updatedSection,
            message: "Section created sucessfully",
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
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
            res.status(401).json({
                sucess: false,
                message: "Please fill all details in section",
            });
        }

        // remove section from course
        const updatedCourse = await Course.findByIdAndUpdate(courseID,
                                    {
                                        $pull:{
                                            courseContent:sectionID,
                                        }
                                    },{new:true});

        // remove section
        await Section.findByIdAndDelete(sectionID);
        res.status(200).json({
            sucess: true,
            message: "Section deleted sucessfully",
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while deleting Section",
            error,
        });
    }
}
