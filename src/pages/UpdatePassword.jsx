import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {useLocation ,useNavigate} from "react-router-dom"
import { resetPassword } from "../services/operation/authAPI";
import HomeButton from "../components/core/HomePage/HomeButton";

export const UpdatePassword = () => {

  const dispatch = useDispatch();  
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    confirmPassword: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event){
    const {password,confirmPassword} = formData;
    event.preventDefault();

    // fetch token from link
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password,confirmPassword,token,navigate))

  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-white">
          <h2>Choose New Password</h2>
          <p>Almost done. Enter your new password and youre all set.</p>

          <label htmlFor="password " className="relative w-full">
            Password <sup className="text-pink-200">*</sup>
            <span
              className="absolute text-white top-[46px] left-[calc(92%)] text-2xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            required
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200"
          />

        <label htmlFor="confirmPassword " className="relative w-full"> Confirm Password <sup className="text-pink-200">*</sup>
            <span
              className="absolute text-white top-[46px] left-[calc(92%)] text-2xl"
              onClick={() => setShowPassword2((prev) => !prev)}
            >
              {showPassword2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <input
            type={showPassword2 ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter confirmPassword"
            value={formData.confirmPassword}
            required
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200"
          />

          <button className="w-max" onClick={submitHandler}>
            <HomeButton color={"yellow"} texts={"Reset Password"}></HomeButton>
          </button>
        </div>
      )}
    </div>
  );
};
