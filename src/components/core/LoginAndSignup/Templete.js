import React from "react";
import LoginForm from "./LoginForm";
import frame from "../../../assets/Images/frame.png";
import SignupForm from "./SignupForm";
import {FcGoogle} from 'react-icons/fc'

export default function Templete({
  title,
  desc1,
  desc2,
  image,
  formtype,
}) {
  return (
    <div className="flex w-11/12 lg:flex-row flex-col-reverse max-w-[1160px] justify-between items-center lg:items-start py-12 mx-auto gap-x-12 lg:gap-y-0 gap-y-12">
      <div className="w-11/12 lg:max-w-[450px] max-w-[520px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>

        <p className='text-[1.125rem] leading[1.625rem] mt-4'>
          <span className="text-richblack-100">{desc1}</span>
          <br/>
          <span className='text-blue-100 italic'>{desc2}</span>
        </p>

        {formtype === "login" ? (
          <LoginForm formtype={formtype} />
        ) : (
          <SignupForm formtype={formtype} />
        )}

        {/* <div className='flex w-full items-center my-4 gap-x-2'>
          <div className='w-full h-[1px] bg-richblack-700'></div>
          <p className='text-richblack-700 font-medium leading[1.375rem]'>OR</p>
          <div className='w-full h-[1px] bg-richblack-700'></div>
        </div>

        <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 '><FcGoogle className="text-2xl"/> Sign in with Google</button> */}

      </div>

      <div className='relative w-11/12 max-w-[450px]'>
      <img src={image} width={588} height={504} alt="login&Signup" loading="lazy" className='absolute -top-4 right-4'/>
      <img src={frame} width={588} height={504} alt="login&Signup" loading="lazy" />
      </div>
    </div>
  );
}
