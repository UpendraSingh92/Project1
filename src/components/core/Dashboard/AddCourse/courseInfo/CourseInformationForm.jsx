import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setStep, setCourse } from "../../../../../slices/courseSlice";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operation/courseDetailsAPI";
import { toast } from "react-toastify";
import { RequirementField } from "./RequirementField";
import { Upload } from "./Upload";
import { TagInput } from "./TagInput";

export const CourseInformationForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { step, course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const response = await fetchCourseCategories();
    if (response.length > 0) {
      setCategory(response);
    }
    setLoading(false);
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log("curr values",currentValues.courseRequirements);
    console.log("course ",course.instructions);

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.description ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString()
    ) return true;
    else return false;
  };

  const submitForm = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("description", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
        console.log("PRINTING result", result);
      } 
      else {
        toast.error("NO Changes made so far");
      }

      return;
    }

    // to create course not to update
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("description", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("tag", data.courseTags);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("category", data.courseCategory);
    formData.append("thumbnail", data.thumbnail);
    formData.append("status", "Draft");

    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }
    
    setLoading(true);
    
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING result", result);
  };

  useEffect(() => {
    getCategories();

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.description);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, []);
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="rounded-md text-white border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="courseTitle" className="label-style">
            Course Title <sup className="text-pink-200 ">*</sup>
          </label>
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="form-style w-full"
          />
          {errors.courseTitle && <span>Course Title is Required**</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="courseShortDesc" className="label-style">
            Course Short Description <sup className="text-pink-200 ">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className=" form-style min-h-[140px] w-full"
          />
          {errors.courseShortDesc && (
            <span>Course Description is required**</span>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label htmlFor="coursePrice" className="label-style">
            Course Price <sup className="text-pink-200 ">*</sup>
          </label>
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full pl-6 form-style"
          />
          {errors.coursePrice && <span>Course Price is Required**</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="courseCategory" className="label-style">
            Course Category <sup className="text-pink-200 ">*</sup>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            className="form-style w-full"
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled className="label-style">
              Choose a Category
            </option>

            {!loading &&
              category.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && <span>Course Category is Required</span>}
        </div>

        {/* create a custom component for handling tags input */}
        <TagInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
        />

        {/* create a component for uploading and showing preview of media */}
        <Upload
            name="thumbnail"
            label="Course Thumbnail"
            register={register}
            errors={errors}
            setValue={setValue}
            editData={editCourse ? course?.thumbnail : null}
            />

        {/*     Benefits of the Course */}
        <div>
          <label className="label-style">
            Benefits of the course <sup className="text-pink-200 ">*</sup>
          </label>
          <textarea
            id="coursebenefits"
            placeholder="Enter Benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="min-h-[130px] form-style w-full"
          />
          {errors.courseBenefits && (
            <span>Benefits of the course are required**</span>
          )}
        </div>

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex gap-2 items-center justify-end">
          {editCourse && (
            <button className="black-btn" onClick={() => dispatch(setStep(2))}>
              continue without saving
            </button>
          )}
          <button className="yellow-btn">
            {!editCourse ? "Next" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
