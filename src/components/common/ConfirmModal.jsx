import React from "react";

export const ConfirmModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <button className="yellow-btn" onClick={modalData?.handler1}>{modalData?.btn1}</button>
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-3 px-5 font-semibold text-richblack-900"
            onClick={modalData?.handler2}
          >
            {modalData?.btn2}
          </button>
        </div>
      </div>
    </div>
  );
};
