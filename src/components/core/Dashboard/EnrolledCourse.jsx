import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  ProgressBar  from "@ramonak/react-progress-bar";
import { getEnrolledCourses } from "../../../services/operation";

export const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const fetchCourse = async () => {
    try {
      const response = await getEnrolledCourses(token);
      setEnrolledCourse(response);
    } catch (error) {
      console.log(error, " unable to fetch courses");
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      {!enrolledCourse ? (
        <div>spinner</div>
      ) : (
        <div>
          {enrolledCourse.length <= 0 ? (
            <div>Not Enrolled yet</div>
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
                      <ProgressBar completed={course.progress} maxCompleted={100} height="8px" isLabelVisible={false} />
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
