
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {FaStar,FaStarHalfAlt,FaRegStar} from "react-icons/fa";
import {MdDeleteSweep} from "react-icons/md";
import {removeCart} from "../../../../slices/cartSlice"

export const RenderCourse = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector( (state)=> state.cart )
    console.log(cart);

    const avgRating = (ratings) =>{
        const avg = ratings?.reduce((acc, curr) => acc + curr.rating, 0);

        return avg/ratings.length;
    }
  return (
    <div className='text-richblack-5 flex flex-1 flex-col w-full'>
        {
            cart.map( (item,indx)=> (
                <div
                    key={indx}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${indx !== 0 && "mt-6"} `}>
                    <img src={item.thumbnail} alt={item?.courseName}
                        className="h-[148px] w-[220px] rounded-lg object-cover"/>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-lg font-medium text-richblack-5'>{item.courseName}</p>
                        <p className="text-sm text-richblack-300">{item.category.name}</p>
                        <div className='flex gap-1'>
                            <span className='text-yellow-25'>{avgRating(item.ratingAndReview)}</span>
                            <ReactStars 
                            count={5} 
                            value={avgRating(item?.ratingAndReview)}
                            size={20}
                            edit={false}
                            activeColor={"#ffd700"}
                            emptyIcon={<FaRegStar/>}
                            filledIcon={<FaStar/>}
                            halfIcon={<FaStarHalfAlt/>}
                            />
                        </div>
                        <p>{item.ratingAndReview.length} Rating</p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-between gap-3 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                    onClick={() => dispatch(removeCart(item._id))}>
                        <button className='flex items-center'><MdDeleteSweep/> <span>Remove</span></button>
                        <p className=" text-3xl font-medium text-yellow-100" >₹ {item.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
