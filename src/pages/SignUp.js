
import React from 'react'
import signImg from '../assets/Images/signup.webp'
import Templete from '../components/core/LoginAndSignup/Templete'

export default function SignUp() {
  return (
    <div>
    <Templete
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skilld for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signImg}
      formtype="signup"
     /></div>
  )
}
