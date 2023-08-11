
import React from 'react'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {FaStar,FaStarHalfAlt,FaRegStar} from "react-icons/fa";
import {MdDeleteSweep} from "react-icons/md";

export const RenderCourse = () => {
    const {cart} = useSelector( (state)=> state.cart )
  return (
    <div>
        {
            cart.map( (item,index)=> (
                <div>
                    <img src={item.thumbnail}/>
                    <p>{item.courseName}</p>
                    <p>{item.category.name}</p>
                    <p>avg rating 5</p>
                    <ReactStars 
                        count={5} 
                        size={20}
                        edit={false}
                        activeColor={"#ffd700"}
                        emptyIcon={<FaRegStar/>}
                        filledIcon={<FaStar/>}
                        halfIcon={<FaStarHalfAlt/>}
                    />
                    <p>rating : {item.rating.length}</p>
                    <div>
                        <button><MdDeleteSweep/> Remove</button>
                        <p>Rs.{item.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
