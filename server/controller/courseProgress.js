const CourseProgress = require('../model/CourseProgress');
const SubSection = require('../model/SubSection');

exports.updateCourseProgress = async(req,res) =>{
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try {
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "subsection not found",
            })
        }

        // check for old entry
        let courseprogress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if(!courseprogress){
            return res.status(404).json({
                success: false,
                message: "courseProgress not exist",
            })
        }

        // if already marked
        if(courseprogress.completedVideos.includes(subSectionId)){
            return res.status(200).json({
                success: true,
                message: "already marked",
                data: courseprogress.completedVideos,
            });
        }
        
        courseprogress.completedVideos.push(subSectionId);
        await courseprogress.save();

        return res.status(200).json({
            success: true,
            message: "marked sucessful",
            data : courseprogress.completedVideos,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "courseProgress error",
            error: error.message,
        })
    }
}

