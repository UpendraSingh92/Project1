import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {markLectureAsComplete} from "../../../services/operation/courseDetailsAPI"
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { BigPlayButton, Player } from "video-react"
import "video-react/dist/video-react.css"

export const VideoDetail = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures} = useSelector((state)=>state.viewCourse);
  
  const [videoData, setVideoData] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const setVideoPlayer = ()=>{
    setLoading(true);
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
    setPreviewData(courseEntireData?.thumbnail);
    setIsVideoEnd(false);
    setLoading(false);
  }
  
  const isFirstVideo = ()=>{
    
    const currSetionIndx = courseSectionData.findIndex((section) => section._id === sectionId);
      
    const currSubSetionIndx = courseSectionData[currSetionIndx].subSections.findIndex((subSection) => subSection._id === subSectionId);
    
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

    const currSubSetionIndx = courseSectionData[currSetionIndx].subSections.findIndex(
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

    const currSubSetionIndx = courseSectionData[currSetionIndx].subSections.findIndex(
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
      navigate(`/view-course/${courseId}/section/${courseSectionData[currSetionIndx + 1]._id}/sub-section/${nextVideo}`);
    }
  }
  
  const gotoPrevious = ()=>{
    // only two case is current playing is section first video or Not
    const currSetionIndx = courseSectionData.findIndex(
      (section) => section._id === sectionId);

    const currSubSetionIndx = courseSectionData[currSetionIndx].subSections.findIndex(
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
      const prevSubSecLen = courseSectionData[currSetionIndx - 1].subSections.length;
      console.log(courseSectionData[currSetionIndx - 1]);
      const previousVideo = courseSectionData[currSetionIndx - 1].subSections[prevSubSecLen - 1]?._id;
      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousVideo}`);
    }
  }

  const handleLectureComplete = async()=>{
    setLoading(true);
    const result = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    console.log(result,completedLectures);
    dispatch(updateCompletedLectures(result));
    setLoading(false);
  }

  useEffect(() => {
    setVideoPlayer();
  },[location.pathname,courseEntireData,courseSectionData]);

  return (
    <div className='text-richblack-5 w-full h-full flex flex-col gap-5'>
      {
        !videoData? (
          <img alt="Preview"
          className="h-full w-full rounded-md object-cover"
          src={previewData}></img>
        ) :
        (<Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setIsVideoEnd(true)}
            src={videoData?.videoUrl}>
          
            <BigPlayButton position='center' />

            {
              isVideoEnd && <div style={{ backgroundImage : "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",}}
              className="w-full h-full flex gap-2 flex-col items-center justify-center absolute inset-0 z-[100] ">
                {
                  // show marks as complete only in which watched first time
                  !completedLectures.includes(subSectionId) && 
                  <button 
                    type='button' 
                    disabled={loading}
                    onClick={() => handleLectureComplete()}
                    className='yellow-btn w-fit'
                    >{!loading? "Mark As Complete" : "Loading..."}
                  </button>
                }

                <button 
                  type='button' 
                  disabled={loading}
                  onClick={() =>{
                    if(playerRef.current){
                      playerRef.current.seek(0);
                      setIsVideoEnd(false);
                    }
                  }}
                  className='yellow-btn w-fit'>
                  {!loading? "Rewatch" : "Loading..."}
                </button>
                
                <div className='mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                  {
                    !isFirstVideo() && 
                    <button 
                      disabled = {loading}
                      className='black-btn'
                      onClick={() => gotoPrevious()}>
                      {!loading? "Prev" : "Loading..."}
                    </button>
                  }
                  {
                    !isLastVideo() && 
                    <button 
                      disabled = {loading}
                      className='black-btn'
                      onClick={() => gotoNext()}>
                      {!loading? "Next" : "Loading..."}
                    </button>
                  }
                </div>
              </div>
            }

          </Player>
        )
      }
    </div>
  )
}
