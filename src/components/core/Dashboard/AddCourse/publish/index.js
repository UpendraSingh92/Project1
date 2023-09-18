import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operation/courseDetailsAPI';
import { MdDashboard } from 'react-icons/md';
import { BiRightArrow } from 'react-icons/bi';

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
        // navigate to dashboard TODO
      }
      const onSubmit = async()=> {
        if(course.status === "published" && getValues("public") === true || 
            course.status === "draft" && getValues("public") === false){
            // no updation occcur 
            // so not need for api call
            goToCourse();
            return;
        }
        
        const formdata = new FormData();
        formdata.append("courseID",course._id);
        const courseStatus = getValues("public") ? "published" : "draft";
        formdata.append("status",courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formdata.token);

        if(result){
            // goto Dashboard
        }
        setLoading(false);
      }

    useEffect( ()=> {
        if(course.status === "published"){
            setValue("public",true);
        }
      },[])

  return (
    <div>
        <h2>Publish Course</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label >Make this course as publish</label>
            <input
                type='checkbox'
                idd='public'
                {...register("public")}
                className='form-style'    
            ></input>
            </div>
            <div className=" flex justify-end gap-5">
            <button disabled={loading} type='button' onClick={gotoBack}>Back</button>
            <button disabled={loading} className="yellow-btn">Save Changes<BiRightArrow/>
        </button>
      </div>
        </form>
    </div>
  )
}
