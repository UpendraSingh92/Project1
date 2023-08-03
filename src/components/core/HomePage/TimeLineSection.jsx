
import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImg from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    Logo :Logo1,
    heading: "Leadership",
    para: "Fully committed to the success company",
  },
  {
    Logo :Logo2,
    heading: "Responsiblity",
    para: "Students will always be our top priority",
  },
  {
    Logo :Logo3,
    heading: "Flexiblity",
    para: "The ability to switch is an important skills",
  },
  {
    Logo :Logo4,
    heading: "Solve the Problem",
    para: "Code your way to a solution",
  },
]

export const TimeLineSection = () => {
  return (
    <div className=' font-inter max-w-maxContent w-11/12 mx-auto flex my-10 gap-5 py-5 items-center'>

    {/* values you got left part*/}
    <div className='flex gap-10 flex-col items-center justify-start w-[40%] my-10'>
      {
        timeline.map((element,index)=>{
          return <div key={index} className='flex w-full gap-[20px]'>
            <div className='relative w-[50px] h-[50px] bg-white flex justify-center items-center rounded-full'>
              <img src={element.Logo} alt='logo'></img>
              <div className='border border-dashed border-richblack-700 absolute top-14 h-9'></div>
            </div>
            <div className='flex flex-col items-star'>
              <h4 className='text-lg font-semibold text-richblack-800'>{element.heading}</h4>
              <p className='text-base text-richblack-700'>{element.para}</p>
            </div>
          </div>
        })
      }
    </div>

    {/* image section */}
    <div className='relative'>
        <img src={timelineImg} alt='img' className=" shadow-[35px_35px_0px_-15px_rgba(255,255,255,1)]"/>
        <div className='absolute left-1/2 translate-x-[-50%] bottom-0 translate-y-[50%] w-[75%] font-inter items-center flex p-10 gap-10 mx-auto bg-caribbeangreen-700'>
          <div className='flex gap-6 items-center w-1/2'>
            <p className='text-white text-4xl font-bold'>10</p>
            <p className='text-base uppercase font-medium text-caribbeangreen-300'>year <br/> experiences</p>
          </div>
          <div className='h-8 w-[1px] bg-caribbeangreen-300'></div>
          <div className='flex gap-6 items-center w-1/2'>
            <p className='text-white text-4xl font-bold'>250</p>
            <p className='text-base uppercase font-medium text-caribbeangreen-300'>types of <br/> course</p>
          </div>
        </div>
    </div>

    </div>
  )
}
