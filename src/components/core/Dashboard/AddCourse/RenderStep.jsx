import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { CourseInformationForm } from "./courseInfo/CourseInformationForm";
import { CourseBuilderForm } from "./courseBuilder/CourseBuilderForm";
import { PublishCourse } from "./publish";

export const RenderStep = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div>
      <div className="text-white flex justify-between mb-10 gap-10">
        {steps.map((oneStep) => (
          <div key={oneStep.id} className="flex flex-col items-center gap-5">
            <div
              className={`${
                step >= oneStep.id
                  ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } text-2xl font-semibold w-10 h-10 rounded-full flex items-center justify-center`}
            >
              {oneStep.id < step ? <FaCheck /> : <div>{oneStep.id}</div>}
            </div>
            <div>{oneStep.title}</div>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <PublishCourse/>}
    </div>
  );
};
