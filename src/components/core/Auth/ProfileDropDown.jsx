import React, {useRef, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from "react-router-dom"
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { logout } from '../../../services/operation/authAPI'

export const ProfileDropDown = () => {

  const {user} = useSelector ((state)=> state.profile);
  const [openDropDown,setOpenDropDown] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null);

  // custom hook which trigger on change of ref
  useOnClickOutside(ref, () => setOpenDropDown(false))
  // console.log(ref,openDropDown);
  if (!user) return null

  return (
    <button className='relative' onClick={() => setOpenDropDown(true)}>
      <div className='flex gap-1 items-center'>
      <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {openDropDown && (
        <div
        // stopPropagation is used to stop parent button
          onClick={(e) => {e.stopPropagation();}}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpenDropDown(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpenDropDown(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}
