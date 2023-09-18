import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch,} from "react-redux";
import { setSignUpData} from "../../../slices/authSlice"; 
import { sendOtp, } from "../../../services/operation/authAPI";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Student");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    let { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submitHandler(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match")
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignUpData(signupData));
    
    dispatch(sendOtp(signupData.email,navigate));

      //reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      
  }
  return (
    <div>
      {/* student and instructor switch tab */}
      <div className="p-1 bg-richblack-700 rounded-full flex justify-between max-w-max mt-6 gap-2">
        <button
          className={`${
            accountType === "Student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-tranparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-300`}
          onClick={() => {
            setAccountType("Student");
          }}
        >
          Student
        </button>

        <button
          className={`${
            accountType === "Instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-tranparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-300`}
          onClick={() => {
            setAccountType("Instructor");
          }}
        >
          Instructor
        </button>
      </div>

      <form
        onSubmit={submitHandler}
        className="flex flex-col text-richblack-5 w-full gap-y-3 mt-6"
      >
        <div className="flex flex-col sm:flex-row w-full gap-y-2 gap-x-4">
          <label className="w-full mb-1">
            <p>
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.firstName}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 
            w-full p-[12px] border-b border-richblack-200"
            ></input>
          </label>

          <label className="w-full mb-1">
            <p>
              last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="lastName"
              placeholder="Enter last Name"
              onChange={changeHandler}
              value={formData.lastName}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 
            w-full p-[12px] border-b border-richblack-200"
            ></input>
          </label>
        </div>

        <label className=" mb-1">
          <p>
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter Email Address"
            onChange={changeHandler}
            value={formData.email}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 
            w-full p-[12px] border-b border-richblack-200"
          ></input>
        </label>

        <div className="flex flex-col gap-y-2 sm:flex-row w-full gap-x-4">
          <label className="w-full relative  mb-1">
            <p>
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword1 ? "text" : "password"}
              required
              name="password"
              placeholder="Enter Password"
              onChange={changeHandler}
              value={formData.password}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200"
            ></input>

            <span
              className="absolute text-white right-3 top-[50%] text-2xl"
              onClick={() => setShowPassword1((prev) => !prev)}
            >
              {showPassword1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label className="w-full relative  mb-1">
            <p>
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={formData.confirmPassword}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200"
            ></input>

            <span
              className="absolute right-3 top-[50%] text-2xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
        </div>

        <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
}
