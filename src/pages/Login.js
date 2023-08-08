
import React from 'react'
import loginImg from '../assets/Images/login.webp'
import Templete from "../components/core/LoginAndSignup/Templete"

export default function Login() {
  return (
    <div>
     <Templete
      title="Welcome Back"
      desc1="Build skilld for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formtype="login"
     />
    </div>
  )
}
