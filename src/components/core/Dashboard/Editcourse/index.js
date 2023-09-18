import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RenderStep } from "../AddCourse/RenderStep";
import { useEffect } from "react";
import { getFullDetailsOfCourse } from "../../../../services/operation/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

export const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text-white">
      <div className='text-white mb-10 text-3xl font-medium'>Edit Course</div>
      <div>{course ? <RenderStep /> : <div>Course Not Found</div>}</div>
    </div>
  );
};
