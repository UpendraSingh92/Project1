import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { getFullDetailsOfCourse } from '../services/operation/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { VideoDetailSidebar } from '../components/core/ViewCourse/VideoDetailSidebar';
import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal';

export const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slider, setSlider] = useState(false);
  const {courseId} = useParams();
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const setCourseDetail = async()=>{
    setLoading(true);
    const courseData = await getFullDetailsOfCourse(courseId,token);
    console.log(courseData);

    dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
    dispatch(setCompletedLectures(courseData.completedVideos));
    dispatch(setEntireCourseData(courseData.courseDetails));
    
    // number of lectures
    let lecture = 0;
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lecture += sec.subSections.length
    })
    dispatch(setTotalNoOfLectures(lecture));
    setLoading(false);
  }

  useEffect(()=>{
    setCourseDetail();
  },[]);

  return (
    <>
        {loading ? <div className='h-full w-full flex items-center justify-center'>Loading</div> : 
        <div className='relative flex min-h-[calc(100vh-60px)] w-full -mt-10'>
              <VideoDetailSidebar slider={slider} setReviewModal={setReviewModal}/>
              <div className='relative w-full h-full'>
                <button type='button' className="p-1 bg-richblack-800 left-0 cursor-pointer z-10 absolute h-fit w-fit" onClick={()=>{setSlider(!slider)}}>
                  {
                    !slider ? <AiOutlineArrowLeft size={24} fill="#fff"/> 
                    : <AiOutlineArrowRight size={24} fill="#fff"/>
                    }
                </button>
                <Outlet/>
              </div>
        </div>}
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}
