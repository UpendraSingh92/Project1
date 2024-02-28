import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {buyCourse} from "../../../../services/operation/paymentAPI"
import { useNavigate } from 'react-router-dom';

export const RenderAmount = () => {
    const {totalPrice, cart} = useSelector( (state)=> state.cart );
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleBuyCourse = ()=> {
      const courses = cart.map((course) => course._id);
      buyCourse(token,courses,user,navigate,dispatch);
    }

  return (
    <div className='min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 self-center sm:self-end md:self-start'>
        <p className='mb-1 text-sm font-medium text-richblack-300'>Total</p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">Rs. {totalPrice}</p>
        <button className='yellow-btn' onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div>
  )
}
