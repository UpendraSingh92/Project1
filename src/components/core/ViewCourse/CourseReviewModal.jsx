import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx"
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { createRating } from '../../../services/operation/courseDetailsAPI'

export const CourseReviewModal = ({setReviewModal}) => {
  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const {courseEntireData} = useSelector((state) => state.viewCourse)
  const {register, handleSubmit, formState:{errors}, setValue} = useForm();

  const addReview = async(data) =>{
    await createRating({
      courseId : courseEntireData?._id,
      rating : data.ratingCount,
      review : data.courseExperience,
    },token);

    setReviewModal(false);
  }

  const ratingChange = (newRating) =>{
    console.log(newRating);
    setValue("ratingCount", newRating);
  }

  useEffect(()=>{
    setValue("courseExperience", "");
    setValue("ratingCount", 0);
  },[]);

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 text-richblack-5'>
        <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
          <p className='text-xl font-semibold'>Add Review</p>
          <button type='button' onClick={()=> {setReviewModal(false)}}>
            <RxCross2 className="text-2xl"/>
          </button>
        </div>
        <div className='flex items-center justify-center gap-x-4 p-6'>
          <img  src={user?.image} alt={user?.firstName + "profile"} className="aspect-square w-[50px] rounded-full object-cover"/>
          <div>
            <p className='font-semibold'>{user?.firstName} {user?.lastName}</p>
            <p className="text-sm">Posting Publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(addReview)} className="mt-4 flex flex-col items-center">
          <ReactStars
            count={5}
            onChange={ratingChange}
            size={30}
            activeColor="#ffd700"
          />

          <div className='flex w-11/12 flex-col space-y-2'>
              <label className='label-style'>
                  <p>Add Your Experience</p>
                  <textarea
                    placeholder='Add Your Experience here ...'
                    {...register("courseExperience", {required:true})}
                    className='form-style resize-x-none min-h-[130px] w-full'
                  />
              </label>
              {
                  errors.courseExperience && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please Add Your Experience
                  </span>)
              }
          </div>

          <div className='mt-6 mb-3 flex w-11/12 justify-end gap-x-2'>
            <button type='button' className='black-btn' onClick={()=> {setReviewModal(false)}}>
              Cancel
            </button>

            <button type='submit' className='yellow-btn'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
