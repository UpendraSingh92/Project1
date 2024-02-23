import React from 'react'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import copy from "copy-to-clipboard"
import { addToCart } from '../../../slices/cartSlice';


export const CourseDetailCard = ({course, setConfirmModal, handleBuyCourse}) => {

  const {user} = useSelector((state)=> state.profile);
  const {token} = useSelector((state)=> state.auth);
  const {thumbnail,price} = course;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = ()=>{
    if (user && user?.accountType === "Instructor") {
      toast.error("You are an Instructor. You can't buy a course.")
      return;
    }
    if (token) {
      dispatch(addToCart(course))
      return;
    }
    setConfirmModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1: "Login",
      btn2: "Cancel",
      handler1: () => navigate("/login"),
      handler2: () => setConfirmModal(null),
    })
  }

  const handleShare = ()=> {
    copy(window.location.href);
    toast.success("Link copied!")
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={thumbnail}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[350px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {price}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellow-btn"
              onClick={
                user && course?.studentEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="black-btn">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div >
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2 items-center`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
