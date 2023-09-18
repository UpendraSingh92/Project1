import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HomeButton from "../components/core/HomePage/HomeButton";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUpUser } from "../services/operation/authAPI";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

export const VerifyEmail = () => {
  const { loading ,signUpData} = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(signUpData);
  
  useEffect( ()=> {
    // console.log(signUpData);
    if(!signUpData){
      navigate("/signup");
    }
  // eslint-disable-next-line
  },[] )

  function submitOtpHandler(event){
    
    event.preventDefault();
    const {firstName,
        lastName,
        email,
        accountType,
        password,
        confirmPassword,
    } = signUpData;

    console.log(otp);
    dispatch(signUpUser(firstName, lastName, email, accountType, password,confirmPassword,otp,navigate));
  }

  return (
    <div className="text-richblue-5 flex justify-center items-center px-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-white max-w-[450px] flex flex-col gap-4 mx-auto mt-20">
          <h2 className="text-4xl font-bold">Verify Email</h2>
          <p className="text-richblack-200 text-[18px]">A verification code has been sent to you. Enter the code below</p>
          <form className="flex flex-col text-richblack-5 w-full gap-y-3 mt-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
              inputStyle={{width: "50px", height:"50px"}}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} placeholder="-" className="border-0 bg-richblack-800  text-richblack-5 aspect-square text-center focus:border-0 focus:outline-1 focus:outline-yellow-50" />
              )}
            ></OTPInput>
            <button className="w-full mt-5" onClick={submitOtpHandler}>
              <HomeButton
                color={"yellow"}
                texts={"submit OTP"}
              ></HomeButton>
            </button>
            <div className="flex justify-between gap-5 mt-4">
              <Link className="flex gap-2 items-center" to={"/login"}><BiArrowBack/>Back to Login</Link>

              <button className="flex text-blue-100 gap-2 items-center" onClick={()=>dispatch(sendOtp(signUpData.email,navigate))}><RxCountdownTimer/>Resend it</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
