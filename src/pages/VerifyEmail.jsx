import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HomeButton from "../components/core/HomePage/HomeButton";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUpUser } from "../services/operation/authAPI";

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
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Verify Email</h2>
          <p>A verification code has been sent to you. Enter the code below</p>
          <form >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            ></OTPInput>
            <button className="w-max" onClick={submitOtpHandler}>
              <HomeButton
                color={"yellow"}
                texts={"submit OTP"}
              ></HomeButton>
            </button>
            <Link to={"/login"}>Back to Login</Link>

            <button onClick={()=>dispatch(sendOtp(signUpData.email,navigate))}>Resend it</button>
          </form>
        </div>
      )}
    </div>
  );
};
