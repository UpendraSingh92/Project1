import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {RiEditBoxLine} from "react-icons/ri"

export const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  function formattedDate(date) {
    if(date !== null){
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    return null;
  }

  return (
    <div className="-mt-5">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 sm:p-8 px-12">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="sm:space-y-1 text-center sm:text-start">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <button className="yellow-btn mt-4 sm:mt-0"
          onClick={() => {
            navigate("/dashboard/setting");
          }}
        >
          Edit
          <RiEditBoxLine />
        </button>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <button
            className="yellow-btn"
            onClick={() => {
              navigate("/dashboard/setting")
            }}
          >
            Edit
            <RiEditBoxLine />
          </button>
        </div>
        <p
          className={`${
            user?.additionalDetail?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetail?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <button
            className="yellow-btn"
            onClick={() => {
              navigate("/dashboard/setting")
            }}
          >
            Edit
            <RiEditBoxLine />
          </button>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 max-w-[500px] sm:justify-between">
          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="flex justify-between sm:flex-col sm:gap-[0px]">
              <p className="mb-2 text-sm text-richblack-400">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-[0px]">
              <p className="mb-2 text-sm text-richblack-400">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-[0px]">
              <p className="mb-2 text-sm text-richblack-400">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
          </div>
          </div>
          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="flex justify-between sm:flex-col sm:gap-[0px]">
              <p className="mb-2 text-sm text-richblack-400">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetail?.gender ?? "Add Gender"}
              </p>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-[0px]">
              <p className="mb-2 text-sm text-richblack-400">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetail?.contactNumber ?? "Add Number"}
              </p>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-[0px]">
              <p className="mb-2 text-sm text-richblack-400">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetail?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
