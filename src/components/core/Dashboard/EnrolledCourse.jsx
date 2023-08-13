import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operation/profileAPI";

export const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourse, setEnrolledCourse] = useState(null);

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

  return (
    <div className="-mt-5">
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
              <div>
                <p>Course Name</p>
                <p>Durations</p>
                <p>Progress</p>
              </div>
              <div>
                {enrolledCourse.map((course) => (
                  <div key={course._id}>
                    <div>
                      <img src={course.thumbnail} />
                      <p>{course.courseName}</p>
                      <p>{course.description}</p>
                    </div>
                    <p>{course.duration}</p>
                    <p>Progress : {course.progress}%</p>
                    <ProgressBar
                      completed={course.progress}
                      maxCompleted={100}
                      height="8px"
                      isLabelVisible={false}
                    />
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
