import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
// import { Autoplay,Navigation, Pagination}  from 'swiper/modules'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import ReactStars from "react-rating-stars-component"
import {ratingsEndpoints} from "../../services/apis"
import { apiConnector } from '../../services/apiConnector'
import { FaStar } from 'react-icons/fa'

export const ReviewSlider = () => {

  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  const getAllReview = async() => {
    const allReview = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
    console.log(allReview);
    setReviews(allReview.data.allRatings);

    if(allReview.data.success){
      console.log(allReview.data.allRatings);
    }
    //{const result = allReview.data.allRatings;
    //console.log(result);}
  }

  useEffect(()=> {
    getAllReview();
  },[]);

  return (
    <div className='text-richblack-5 w-full'>
        <div className='my-[50px] w-full'>
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
              breakpoints={{
              700: {
                slidesPerView: 2,
                loop: true
              },
              1024: {
                slidesPerView: 3,
                loop: true
              }
            }}
            className='w-full'>
              {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 w-full">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25 min-h-[80px]">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          </Swiper>
        </div>
    </div>
  )
}
