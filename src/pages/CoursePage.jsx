import React, { useEffect } from 'react'
import { useState } from 'react';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operation/paymentAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../services/operation/courseDetailsAPI';
import { addToCart } from '../slices/cartSlice';
import GetAvgRating from '../utils/avgRating';
import { Fotter } from "../components/common/Fotter"
import { ConfirmModal } from "../components/common/ConfirmModal"
import { toast } from 'react-toastify';
import RatingStars from '../components/common/RatingStars';
import { CourseDetailCard } from '../components/core/Course/CourseDetailCard';
import { CollapseDropDown } from '../components/core/Course/CollapseDropDown';

export const CoursePage = () => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state)=> state.auth); 
    const [response, setResponse] = useState(null);
    const [totalLecture, setTotalLecture] = useState(0);
    const [avgReview, setAvgReview ] = useState(0);
    const [confirmModal, setConfirmModal] = useState(null);

    // which section are open / active
    const [openSection, setOpenSection] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const handleBuyCourse = async() =>{
        
      if(token){
        buyCourse(token, [courseId], user, navigate, dispatch);
        return;
      }
      setConfirmModal({
        text1: "You are not logged in!",
        text2: "Please login to Buy Course",
        btn1: "Login",
        btn2: "Cancel",
        handler1: () => navigate("/login"),
        handler2: () => setConfirmModal(null),
      })
    }

    const fetchOneCourse = async()=>{
      const courseInfo = await fetchCourseDetails(courseId);
      setResponse({...courseInfo?.course, totalDuration:courseInfo?.totalDuration});

      let result = GetAvgRating(courseInfo?.course?.ratingAndReview)
      setAvgReview(result);
      console.log("hi" ,courseInfo);

      let lecture = 0;
      courseInfo?.course?.courseContent?.forEach( (section) => {
        lecture += section?.subSections?.length || 0;
      })
      setTotalLecture(lecture);

      if(!courseInfo){
        navigate("/error");
      }
    }

    const handleOpenSection = (id)=>{
      setOpenSection(
        !openSection.includes(id) ? 
        openSection.concat([id]) :
        openSection.filter((e) => e != id)
      )
    }

    useEffect( ()=> {
      fetchOneCourse(courseId);
    },[courseId]);

  return (
    <>
    <div className={`relative w-full bg-richblack-800 -mt-10`}>    
        {!response ? <div>Loading...</div> : 
          <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
              <div className="relative block max-h-[30rem] lg:hidden">
                <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                <img
                  src={response?.thumbnail}
                  alt="course thumbnail"
                  className="aspect-auto w-full"
                />
              </div>
              <div
                className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
              >
                <div>
                  <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                    {response?.courseName} 
                  </p>
                </div>
                <p className={`text-richblack-200`}>
                  {response?.description} 
                </p>
                <div className="text-md flex flex-wrap items-center gap-2">
                  <span className="text-yellow-25">{avgReview}</span>
                  <RatingStars Review_Count={avgReview} Star_Size={24} />
                  <span>
                    {`(${response?.ratingAndReview?.length} reviews)`} 
                  </span>
                </div>
                  <div>
                    {`${response?.studentEnrolled?.length} students enrolled`}
                  </div>
                <div>
                  <p className="">
                    Created By {`${response?.instructor?.firstName} ${response?.instructor?.lastName}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 text-lg">
                  <p className="flex items-center gap-2">
                    {" "}
                    <BiInfoCircle /> Created at {(response.createdAt)?.split("T")?.at(0)}
                  </p>
                  <p className="flex items-center gap-2">
                    {" "}
                    <HiOutlineGlobeAlt /> English
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-evenly border-y border-y-richblack-500 py-2 sm:py-4 lg:hidden">
                <p className="space-x-3 sm:pb-3 text-3xl font-semibold text-richblack-5">
                  Rs. {response?.price}
                </p>
              <button
                className="yellow-btn lg:hidden"
                onClick={
                  user && response?.studentEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
              >
                {user && response?.studentEnrolled.includes(user?._id)
                  ? "Go To Course"
                  : "Buy Now"}
                </button>
              </div>
            </div>

            {/* Courses Card */}
            <div className="right-[2rem] top-[40px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
              <CourseDetailCard
                course={response}
                setConfirmModal={setConfirmModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        }
    </div>

    {response && <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
                {response?.whatYouWillLearn}
              {/* <ReactMarkdown>
                {response.whatYouWillLearn}
                {/* what you will learn }
              </ReactMarkdown> */}
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {response?.courseContent?.length} {`section(s)`}
                  </span>
                  <span>
                    {totalLecture} {`lecture(s)`}
                  </span>
                  <span>{response?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    //onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {response?.courseContent?.map((section, index) => (
                <CollapseDropDown
                  section={section}
                  key={index}
                  openSection={openSection}
                  handleOpenSection={handleOpenSection}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    response?.instructor?.image
                      ? response?.instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.instructor?.firstName} ${response?.instructor?.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${response?.instructor?.firstName} ${response?.instructor?.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {response?.instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>}
    <Fotter />
      {confirmModal && <ConfirmModal modalData={confirmModal} />}
    </>
  )
}
