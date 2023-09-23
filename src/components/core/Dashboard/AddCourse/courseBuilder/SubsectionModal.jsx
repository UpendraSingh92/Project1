import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import {createSubSection,updateSubSection,} from "../../../../../services/operation/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { toast } from "react-toastify";
import { Upload } from "../courseInfo/Upload";

export const SubsectionModal = ({
  modalData,
  view = false,
  add = false,
  edit = false,
  setModal,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      console.log(modalData);
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currValue = getValues();

    if (
      currValue.lectureTitle !== modalData.title ||
      currValue.lectureDesc !== modalData.description ||
      currValue.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map( (section) => section._id === modalData.sectionId ? result : section);
      const updatedCourse = {...course, courseContent:updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setModal(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        //edit krdo store me
        handleEditSubSection();
      }
      return;
    }

    // ADD
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);
    setLoading(true);
    //API CALL
    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map( (section) => section._id === modalData ? result : section);
        const updatedCourse = {...course, courseContent:updatedCourseContent};
        dispatch(setCourse(updatedCourse));
    }
    setModal(null);
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModal(null) : {})}>
            <RxCross1 className="text-2xl text-richblack-5"/>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          <Upload 
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div>
              <label className="label-style">Lecture Title {!view && <sup className="text-pink-200">*</sup>}</label>
              <input 
              disabled={view || loading}
              id='lectureTitle'
              placeholder='Enter Lecture Title'
              {...register("lectureTitle", {required:true})}
              className='w-full form-style'
          />
              {errors.lectureTitle && (<span>Lecture Title is required</span>)}
          </div>
          <div>
              <label className="label-style">Lecture Description {!view && <sup className="text-pink-200">*</sup>}</label>
              <textarea 
              disabled={view || loading}
              id='lectureDesc'
              placeholder='Enter Lecture Description'
              {...register("lectureDesc", {required:true})}
              className='w-full min-h-[130px] form-style'
          />
              {
                  errors.lectureDesc && (<span>Lecture Description is required</span>)
              }
          </div>
          {
              !view && (
              <div className="w-full">
                <button className="yellow-btn mr-0">{loading ? "Loading...": edit ? "Save Changes" : "Save"}</button>
              </div>)
          }
        </form>
      </div>
    </div>
  );
};
