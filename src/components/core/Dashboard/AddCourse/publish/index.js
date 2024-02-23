import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operation/courseDetailsAPI';
import { MdDashboard } from 'react-icons/md';
import { BiRightArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const PublishCourse = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm();

      const [loading, setLoading] = useState(false);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const { course } = useSelector((state) => state.course);
      const { token } = useSelector((state) => state.auth);

      const gotoBack = () => {
        dispatch(setStep(2));
        // means we are going to edit in step 1
        dispatch(setEditCourse(true));
      };

      const goToCourse = () => {
        // means we are not uploading any course
        dispatch(resetCourseState());
        navigate("/dashboard/my-course")
      }

      const onSubmit = async()=> {
        if(course.status === "Published" && getValues("public") === true || 
            course.status === "Draft" && getValues("public") === false){
            // no updation occcur 
            // so not need for api call
            goToCourse();
            return;
        }
        
        const formdata = new FormData();
        formdata.append("courseId",course._id);
        const courseStatus = getValues("public") ? "Published" : "Draft";
        formdata.append("status",courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formdata,token);

        if(result){
            goToCourse();
        }
        setLoading(false);
      }

    useEffect( ()=> {
        if(course.status === "Published"){
            setValue("public",true);
        }
      },[])

  return (
    <div className='rounded-md border-[1px] mx-auto max-w-[500px] border-richblack-700 bg-richblack-800 p-6'>
        <h2 className="text-2xl font-semibold text-richblack-5">Publish Setting</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-6 mb-8">
            <label>
              <input
                type='checkbox'
                id='public'
                {...register("public")}
                className='form-style ml-2 border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-900 focus:ring-2 focus:ring-richblack-5'    
              ></input>
              <span className="ml-2 text-lg text-richblack-400">
                Make this course as public
              </span>
            </label>
            </div>
            <div className=" flex justify-end gap-5">
            <button className='black-btn' disabled={loading} type='button' onClick={gotoBack}>Back</button>
            <button disabled={loading} className="yellow-btn">Save Changes<BiRightArrow/>
        </button>
      </div>
        </form>
    </div>
  )
}
