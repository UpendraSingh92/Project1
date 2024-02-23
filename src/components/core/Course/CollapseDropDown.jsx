import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineDown } from "react-icons/ai"
import "./Collapse.css"

export const CollapseDropDown = ({section, openSection, handleOpenSection}) => {

  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-5 transition-[0.3s]`}
          onClick={() => {
            handleOpenSection(section._id)
          }}
        >
          <div className="flex items-center gap-2">
            <i
              className={
                openSection.includes(section._id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            <p>{section?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-yellow-25">
              {`${section.subSections.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        //ref={contentEl}
        className={`relative overflow-hidden bg-richblack-900 transition-all duration-[0.5s] ${openSection.includes(section._id) ? " h-[100%]" : "h-0"}`}>
        <div className="text-lg flex flex-col gap-[1px] font-semibold">
          {section?.subSections?.map((subSec, i) => {
            return <div className={`${i & 1 ? "bg-richblack-600" : "bg-richblack-400"} px-7 py-4`} key={i}>{subSec.title}</div>
          })}
        </div>
      </div>
    </div>
  )
}
