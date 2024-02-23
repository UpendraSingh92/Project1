import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';


export const CatalogCards = ({course}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect( ()=> {
        console.log(course);
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count);
    },[course]);

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img 
                        src={course?.thumbnail}
                        alt='course ka thumbnail'
                        className={`w-full rounded-xl object-cover`}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p className="text-sm text-richblack-50">
                      {course?.instructor?.firstName} {course?.instructor?.lastName}
                     </p>
                    <div className='flex items-center w-full gap-x-3'>
                        <span className="text-yellow-5">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <div className="text-richblack-400 gap-1 flex">{course.ratingAndReview?.length}<span>Ratings</span></div>
                    </div>
                    <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )

}

