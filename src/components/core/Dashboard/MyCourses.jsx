import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI';
import { CourseTable } from './InstructorCourse/CourseTable';

export const MyCourses = () => {

    const dispatch = useDispatch();
      const { course } = useSelector((state) => state.course);
      const { token } = useSelector((state) => state.auth);
      const navigate = useNavigate();
      const [courses,setCourses] = useState([]);

      useEffect( ()=> {
        const fetchCourse = async() => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
                console.log(result);
            }
        }

        fetchCourse();
      },[])
  return (
    <div>
        <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
            <button 
            onClick={ ()=> navigate("/dashboard/add-course")}
            className='yellow-btn'
            >Add Course</button>
        </div>
        <div>
            {
                <CourseTable courses={courses} setCourses={setCourses} />
            }
        </div>
    </div>
  )
}
