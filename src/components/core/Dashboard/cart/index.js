import React from 'react'
import { useSelector } from 'react-redux'
import { RenderCourse } from './RenderCourse'
import { RenderAmount } from './RenderAmount'


export default function Cart() {
    const {totalItems,totalPrice} = useSelector( (state)=> state.cart )
  return (
    <div className='text-richblack-5'>
        <h2 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h2>
        <p className='text-richblack-200 font-semibold mb-2'>{totalItems} Courses in Your Cart</p>
        <div className='h-[1px] bg-richblack-200 my-[2px] mb-3'></div>
        {
            totalPrice <= 0 ? <div className='text-richblack-200 mt-10 text-3xl text-center font-medium mb-2'>Your Cart Is Empty</div> :
            <div className="mt-8 flex flex-col items-start gap-x-10 gap-y-6 md:flex-row">
                <RenderCourse/>
                <RenderAmount/>
            </div>
        }
    </div>
  )
}

