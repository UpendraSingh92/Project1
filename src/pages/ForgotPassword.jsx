import React, { useState } from "react";
import HomeButton from "../components/core/HomePage/HomeButton";
import { BsArrowLeft } from "react-icons/bs";
import { Link ,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getResetPasswordToken} from "../services/operation/authAPI"

export const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [sentEmail, setsentEmail] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function changeHandler(event) {
    setFormEmail(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault()
    const data = {
      email: formEmail,
    };
    console.log(data);
    dispatch(getResetPasswordToken(formEmail,setsentEmail));
  }

  return (
    <div className="text-white px-2 flex justify-center">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="mx-auto w-[450px] justify-center mt-20 flex flex-col gap-4">
          <h2 className="text-3xl text-left font-semibold">
            {
                !sentEmail ? "Reset Your Password" : "Check Email"
            }
          </h2>
          <p className="text-[18px] text-richblack-300 text-left mx-auto">
            {
                !sentEmail ? "Have no fear. We will email you instructions to reset your password.If you dont have access to your email we can try account recovery." : `We have sent the reset email to ${formEmail} `
            }
          </p>

          <form
            className="flex flex-col w-full gap-y-2 mt-2"
          >
            <label htmlFor="email" className="w-full">
              Email Address <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formEmail}
              required
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200"
            />

            <button className="w-full mt-3" onClick={submitHandler}><HomeButton color={"yellow"} texts={"Reset Password"}></HomeButton></button>

            <Link to={"/login"} className="flex gap-2 items-center"><span><BsArrowLeft/></span> Back to Login</Link>
          </form>
        </div>
      )}
    </div>
  );
};
