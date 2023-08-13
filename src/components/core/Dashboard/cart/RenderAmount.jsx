import React from 'react'
import { useSelector } from 'react-redux';

export const RenderAmount = () => {
    const {totalPrice} = useSelector( (state)=> state.cart );
    const handleBuyCourse = ()=> {

    }

  return (
    <div className='text-richblack-5'>
        <p>Total</p>
        <p>Rs. {totalPrice}</p>
        <button onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div>
  )
}
