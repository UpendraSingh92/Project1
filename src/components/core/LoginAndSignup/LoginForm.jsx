import React, { useState } from "react";
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operation/authAPI";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  function changeHandler(event) {
    setFormData((prev) => {
      let { value, name } = event.target;
      return { ...prev, [name]: value };
    });
  }

  function submitHandler(event){
    event.preventDefault();
    dispatch(login(formData.email,formData.password,navigate));
    
  }
  return (
      <div>
        <form onSubmit={submitHandler} className="flex text-richblack-5 flex-col w-full gap-y-2 mt-6">
          <label htmlFor="email"
            className="w-full">
            Email Address <sup className='text-pink-200'>*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            required
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200'
          />

          <label htmlFor="password " className="relative w-full">
            Password <sup className='text-pink-200'>*</sup>

            <span className="absolute text-white top-[46px] left-[calc(85%)] md:left-[calc(92%)] text-2xl"
            onClick={() => setShowPassword( (prev) => !prev)}>
              {showPassword? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
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
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-200'
          />

          <Link to="/forgotpassword">
            <p className='text-xs mt-0 ml-auto text-blue-100 font-semibold max-w-max '>Forget Password</p>
          </Link>

          <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Sign In</button>
        </form>
      </div>
  );
}
