import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {markLectureAsComplete} from "../../../services/operation/courseDetailsAPI"
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';

export const VideoDetail = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures} = useSelector((state)=>state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const setVideoPlayer = ()=>{
    if(!courseSectionData){
      return;
    }
    if(!courseId || !sectionId || !subSectionId){
      navigate("dashboard/entrolled-courses")
      return;
    }
    
    // we have all data 
    const filteredSection = courseSectionData.filter((section) => section._id === sectionId);

    const filteredVideo = filteredSection[0].subSections.filter((subSec) => subSec._id === subSectionId);

    setVideoData(filteredVideo[0]);
    setIsVideoEnd(false);
  }
  
  const isFirstVideo = ()=>{
    const currSetionIndx = courseSectionData.findIndex(
      (section) => section._id === sectionId);

    const currSubSetionIndx = courseSectionData[currSetionIndx].findIndex(
      (subSection) => subSection._id === subSectionId);
    
    if(currSetionIndx === 0 && currSubSetionIndx === 0){
      return 1;
    }
    else{
      return 0;
    }
  }
  
  const isLastVideo = ()=>{
    const currSetionIndx = courseSectionData.findIndex(
      (section) => section._id === sectionId);

    const currSubSetionIndx = courseSectionData[currSetionIndx].findIndex(
      (subSection) => subSection._id === subSectionId);
    
    const sectionLen = courseSectionData.length;
    const subSectionLen = courseSectionData[currSetionIndx].subSections.length;

    if(currSetionIndx === sectionLen-1 && currSubSetionIndx === subSectionLen-1){
      return 1;
    }
    else{
      return 0;
    }
  }

  const gotoNext = ()=>{
    // only two case is current playing is section last video or Not
    const currSetionIndx = courseSectionData.findIndex(
      (section) => section._id === sectionId);

    const currSubSetionIndx = courseSectionData[currSetionIndx].findIndex(
      (subSection) => subSection._id === subSectionId);
    
    const subSectionLen = courseSectionData[currSetionIndx].subSections.length;

    // is next video exist in same section or not
    if(currSubSetionIndx < subSectionLen - 1){
      // yes can go
      const nextVideo = courseSectionData[currSetionIndx].subSections[currSubSetionIndx + 1]?._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextVideo}`);
    }
    else{
      // no you can only go on next sections first subsection
      const nextVideo = courseSectionData[currSetionIndx + 1].subSections[0]?._id;
      navigate(`/view-course/${courseId}/section/${courseSectionData[currSetionIndx + 1]}/sub-section/${nextVideo}`);
    }
  }
  
  const gotoPrevious = ()=>{
    // only two case is current playing is section first video or Not
    const currSetionIndx = courseSectionData.findIndex(
      (section) => section._id === sectionId);

    const currSubSetionIndx = courseSectionData[currSetionIndx].findIndex(
      (subSection) => subSection._id === subSectionId);
    
    const sectionLen = courseSectionData.length;
    const subSectionLen = courseSectionData[currSetionIndx].subSections.length;

    // is previous video exist in same section or not
    if(currSubSetionIndx > 0){
      // yes can go
      const previousVideo = courseSectionData[currSetionIndx].subSections[currSubSetionIndx - 1]?._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousVideo}`);
    }
    else{
      // no you can only go on previous sections's last subsection
      const previousSectionId = courseSectionData[currSetionIndx - 1]?._id;
      const prevSubSecLen = courseSectionData[currSetionIndx - 1].length;
      const previousVideo = courseSectionData[currSetionIndx + 1].subSections[prevSubSecLen - 1]?._id;
      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousVideo}`);
    }
  }

  const handleLectureComplete = async()=>{
    setLoading(true);
    const result = await markLectureAsComplete({courseId: courseId, subsectionId: subSectionId}, token);

    dispatch(updateCompletedLectures(result));
    setLoading(false);
  }

  useEffect(() => {
    setVideoPlayer();
  },[location.pathname,courseEntireData,courseSectionData]);

  return (
    <div className='text-richblack-5'>VideoDetail</div>
  )
}
