

import React from 'react'
import { useSelector } from 'react-redux'


export default function Cart() {
    const {totalItems,cart,totalPrice} = useSelector( (state)=> state.cart )
  return (
    <div>
        <h2>Your Cart</h2>
        <p>{totalItems} in Your Cart</p>
        {
            totalPrice <= 0 ? <div>Your Cart Is Empty</div> :
            <div>
                <RenderCourse/>
                <RenderAmount/>
            </div>
        }
    </div>
  )
}

