import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"

export const VideoDetailSidebar = ({slider, setReviewModal}) => {

  const [activeSection,setActiveSection] = useState("");
  const [activeVideo,setActiveVideo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {sectionId,subSectionId} = useParams();
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures} = useSelector((state)=>state.viewCourse);

  // default 1st video is always highlighted 

  useEffect(()=>{
      // new syntax
      ;(()=>{
        if(!courseSectionData.length){
            return;
        }

        const currentSecIndx = courseSectionData.findIndex((section) => section._id === sectionId );

        const currentSubSecIndx = courseSectionData?.[currentSecIndx].subSections.findIndex((subSection) => subSection._id === subSectionId );
        
        const highlightedSubSecId = courseSectionData?.[currentSecIndx].subSections[currentSubSecIndx]?._id;

        // set section id & subsection id
        setActiveSection(courseSectionData[currentSecIndx]?._id)
        setActiveVideo(highlightedSubSecId)
    })();
  },[courseSectionData,location.pathname])

  return (
    <>
        <div className={`flex h-[calc(100vh-60px)] w-[300px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 videoSidebar ${slider? "-translate-x-full absolute" : "translate-x-0"} transition-all duration-300`}>
            <div className='mx-1 sm:mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-3 sm:py-5 text-lg font-bold text-richblack-25'>
              <div className="flex sm:flex-row gap-3 sm:gap-0 flex-col w-full items-center justify-between ">
                <button type='button' className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 duration-150' onClick={()=>{navigate("/dashboard/enrolled-courses")}}>
                  <IoIosArrowBack size={20} />
                </button>

                <button type='button' className='yellow-btn' onClick={()=>{setReviewModal(true)}}>
                  Add Review
                </button>  
              </div>      

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between items-center w-full">
                <p>{courseEntireData?.courseName}</p>
                <p className="text-sm font-semibold text-richblack-300">{completedLectures.length} / {totalNoOfLectures}</p>
              </div>
            </div>

            <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>{
                courseSectionData.map((section, indx) => (
                  <div className='mt-2 cursor-pointer text-sm text-richblack-5' onClick={()=> setActiveSection(section._id)} key={indx}>
                    <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                      <div className="w-[70%] font-semibold">
                        {section?.sectionName}
                      </div>
                      <div className="flex items-center gap-3">
                      <span className={`${activeSection === section?._id
                                      ? "rotate-180": "rotate-0"} transition-duration-500 transition-all`}>
                        <BsChevronDown/>
                      </span>
                    </div>
                  </div>

                    {/* sub section */}                      
                    {
                      (activeSection === section._id) && (
                        <div className='flex flex-col gap-[1px] transition-[height] duration-500 ease-in-out'>{
                          section.subSections.map((subsection,indxx) => (
                            <div className={`flex gap-3 px-5 py-2 ${ activeVideo === subsection._id ? "bg-yellow-100 font-semibold text-richblack-800" : "hover:bg-richblack-900"}`}
                            key={indxx}
                            onClick={()=>{
                              if(activeVideo !== subsection._id){
                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`);
                                setActiveVideo(subsection?._id);
                              }
                            }}>
                            <input
                            type="checkbox"
                            checked={completedLectures.includes(subsection?._id)}
                            onChange={() => {}}
                            className="w-6 p-2 bg-richblack-900"/>
                              {subsection.title}
                            </div>))
                          }
                        </div>)
                    }
                  </div>))
                }
            </div>
        </div>
    </>
  )
}
