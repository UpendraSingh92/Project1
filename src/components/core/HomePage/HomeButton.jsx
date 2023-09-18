import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

function HomeButton({color,texts,linkto,arrow}) {
  return (
    <Link to={linkto}>
        <div className={`py-3 w-full px-4 font-semibold flex items-center justify-center gap-4 border-pure-greys-25 border-r-[1px] border-b-[1.2px] rounded-md hover:scale-90 transition-all duration-200 cursor-pointer ${(color === "yellow")? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}`}>
        {texts}
        {(arrow)?<FaArrowRight/> : ""}
    </div>
    </Link>
  )
}

export default HomeButton