import React from 'react'

export const RenderAmount = () => {
    const {totalPrice} = useSelector( (state)=> state.cart );
    const handleBuyCourse = ()=> {

    }

  return (
    <div>
        <p>Total</p>
        <p>Rs. {totalPrice}</p>
        <button onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div>
  )
}
