import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../services/operation/profileAPI';
import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI';
import { Link } from 'react-router-dom';
import { InstructorChart } from './InstructorChart';

export const Instructor = () => {

  const [loading,setLoading] = useState(true);
  const [instructorData,setInstructorData] = useState(null);
  const [courseData,setCourseData] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  const getInstructorDashboardData = async() => {
    setLoading(true);
    const response1 = await getInstructorData(token);
    const response2 = await fetchInstructorCourses(token);

    if(response1 && response1.length > 0){
        setInstructorData(response1)
        console.log(response1,response2);
    }
    if(response2){
        setCourseData(response2)
    }
    setLoading(false);
  }

  useEffect(() => {
    getInstructorDashboardData();
  },[]);
  
  const totalAmount = instructorData?.reduce(
    (acc,curr) => acc + curr.totalamount , 0);

  const totalStudents = instructorData?.reduce(
    (acc,curr) => acc + curr.totalStudent , 0);


  return (
    <>
      <div>
        <h1 className='text-2xl font-bold text-richblack-5'>
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>

      {
        loading ? <div>loading</div> : 
        courseData.length > 0 ? (
          <div>
            <div className='my-4 flex gap-4 flex-col md:flex-row text-richblack-5'>
              {
                totalStudents > 0 || totalAmount > 0 ? (
                  <InstructorChart courses = {instructorData}/> 
                  ) :
                  (<div>
                    <div className="flex-1 rounded-md bg-richblack-800 p-6">
                    <p className="text-lg font-bold text-richblack-5">Visualize</p>
                    <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                    </p>
                    </div>
                  </div>) 
              }

              {/* {total stats overall side box} */}
              <div className="flex flex-2 min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {courseData.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-md bg-richblack-800 p-6'>
              {/* render 3 courses */}
              <div className="flex items-center  justify-between">
                <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                <Link to="/dashboard/my-course">
                  <p className="text-base font-semibold text-yellow-50">View All</p>
                </Link>
              </div>
              <div className="my-4 flex items-start flex-wrap gap-6 lg:justify-between justify-center">
                {courseData.slice(0, 3).map((course) => (
                  <div key={course._id} className="w-full sm:w-[30%] min-w-[260px]">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full border-pure-greys-100 border object-contain"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {course.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {course.studentEnrolled.length} students
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          Rs. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>) : 
          (<div>
            <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
              <p className="text-center text-2xl font-bold text-richblack-5">
                You have not created any courses yet
              </p>
              <Link to="/dashboard/add-course">
                <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                  Create a course
                </p>
              </Link>
            </div>
          </div>)
      }
    </>
  )
}
