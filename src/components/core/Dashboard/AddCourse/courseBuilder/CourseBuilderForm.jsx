import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import {
  updateSection,
  createSection,
} from "../../../../../services/operation/courseDetailsAPI";
import { toast } from "react-toastify";
import { NestedView } from "./NestedView";

export const CourseBuilderForm = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  console.log(course);

  const cancelClick = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const onSubmit = async (data) => {
    let result;
    console.log(data,);

    if (editSectionName) {
      //we are editing the secgtion name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },token);
    } 
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },token);
        console.log(result);
    }

    //update values
    if(result) {
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName", "");
      }
  };

  const gotoNext = () => {
    if (course && course?.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSections.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  };

  const gotoBack = () => {
    dispatch(setStep(1));
    // means we are going to edit in step 1
    dispatch(setEditCourse(true));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChangeEdit = (sectionId,sectionName) =>{

    // for toggle if already in edit mode so off edit mode
    if(editSectionName === sectionId){
      cancelClick();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  return (
    <div className="text-white bg-richblack-800 p-6 rounded-lg">
      <h1 className="text-white text-3xl py-2 mb-4 font-medium">
        Course Builder
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName" className="label-style">
            Section name <sup>*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full form-style mt-2"
          />
          {errors.sectionName && <span>Section Name is required</span>}
        </div>

        <div className="flex gap-10">
          <button type="submit" className=" flex gap-2 my-3 items-center">
            {!editSectionName ? "Create Section" : "Edit Section"}
            <MdAddCircleOutline className="text-yellow-50" size={20} />
          </button>
          {editSectionName && (
            <button
              type="button"
              className="text-richblack-25"
              onClick={cancelClick}
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {course &&
        course.courseContent.length > 0 && (  
        <NestedView handleChangeEdit={handleChangeEdit}/> ) 
        }
      <div className=" flex justify-end gap-5">
        <button className="black-btn" onClick={gotoBack}>Back</button>
        <button className="yellow-btn" onClick={gotoNext}>
          Next <BiRightArrow />
        </button>
      </div>
    </div>
  );
};
