import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operation/profileAPI";
import { useNavigate } from "react-router-dom";

export const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const findDuration = (course) =>{
    let totalDurationInSeconds = 0
    course.courseContent.forEach((content) => {
      content.subSections.forEach((subSec) => {
        const timeDurationInSeconds = parseInt(subSec.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    // in minutes
    return (totalDurationInSeconds/60).toFixed(2);
  }

  const findProgress = []

  const fetchCourse = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log(response);
      setEnrolledCourse(response);
    } catch (error) {
      console.log(error, " unable to fetch courses");
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (<div className="-mt-2 text-white">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Enrolled Courses
      </h1>
      {/* <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12"></div> */}
      {!enrolledCourse ? (
        <div>spinner</div>
      ) : (
        <div>
          {enrolledCourse.length <= 0 ? (
            <div className="text-lg text-center text-richblack-5">You Have Not Enrolled In Any Course Yet</div>
          ) : (
            <div>
              <div className="flex rounded-t-lg bg-richblack-500 text-richblack-5">
                <p className="w-[35%] sm:w-[45%] px-5 py-3">Course Name</p>
                <p className="flex-1 px-2 py-3">Durations</p>
                <p className="flex-1 px-2 py-3">Progress</p>
              </div>
              <div>
                {enrolledCourse.map((course, indx) => (
                  <div key={course._id} className={`flex items-center border border-richblack-700 ${indx === enrolledCourse.length - 1 ? "rounded-b-lg" : "rounded-none"}`}>
                    <div className="flex w-[40%] sm:w-[45%] flex-col sm:flex-row cursor-pointer sm:items-center gap-4 px-5 py-3" onClick={()=> navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`)}>
                      <img src={course.thumbnail} alt="course_img" className="h-14 w-14 rounded-lg object-cover"/>
                      <div className="flex max-w-xs flex-col gap-2">
                        <p className="sm:font-semibold">{course.courseName}</p>
                        <p className="text-xs hidden sm:flex text-richblack-300">
                        {course.description.length > 50
                      ? `${course.description.slice(0, 50)}...`
                      : course.description}</p>
                      </div>
                    </div>
                    <p className="flex-1">{findDuration(course) + " Min"}</p>
                    <div className="flex flex-1 w-1/5 flex-col gap-2 px-2 py-3 ">

                      <p>Progress : {course.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        maxCompleted={100}
                        height="8px"
                        isLabelVisible={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
