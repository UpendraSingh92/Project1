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

export const CourseBuilderForm = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const cancelClick = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const onSubmit = async (data) => {
    let result;

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
    }

    //update values
    if(result) {
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName", "");
      }
  };

  const gotoNext = () => {
    if (course && course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  };

  const gotoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
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
            {editSectionName ? "Create Section" : "Edit Section"}
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
        course.courseContent.length > 0 &&
        {
          /* <NestedView/> */
        }}
      <div className=" flex justify-end gap-5">
        <button onClick={gotoBack}>Back</button>
        <button className="yellow-btn" onClick={gotoNext}>
          Next <BiRightArrow />
        </button>
      </div>
    </div>
  );
};
