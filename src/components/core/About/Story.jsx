
import React from 'react'
import StoryImage from "../../../assets/Images/FoundingStory.png"
import { RedText } from '../HomePage/RedText'
import { OrangeText } from '../HomePage/OrangeText'
import { HighlightText } from '../HomePage/HighlightText'

export const Story = () => {
  return (
    <div className='text-white w-10/12 mx-auto flex flex-col gap-24'>
        <div className='flex flex-col lg:flex-row gap-20 lg:gap-10 justify-between items-center'>
            <div className='text-4xl font-semibold flex flex-col lg:w-[45%] gap-8'>
                <RedText texts={"Our Founding Story"}></RedText>
                <p className='text-sm text-richblack-300 font-normal'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                <p className='text-sm text-richblack-300 font-normal'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            <div>
                <img src={StoryImage} alt='story' className='shadow-[0px_0px_20px_1px_#ff00b7]'/>
            </div>
        </div>
        <div className='flex flex-col md:flex-row gap-10 justify-between items-center'>
            <div className='text-4xl font-semibold flex flex-col md:w-[45%] gap-8'>
                <OrangeText texts={"Our Vision"}/>
                <p className='text-sm text-richblack-300 font-normal'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className='text-4xl font-semibold flex flex-col md:w-[45%] gap-8'>
                <HighlightText texts={"Our Mission"}/>
                <p className='text-sm text-richblack-300 font-normal'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
    </div>
  )
}
