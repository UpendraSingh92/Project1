import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import { Autoplay,Navigation, Pagination}  from 'swiper/modules'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {CatalogCards} from './CatalogCards'

export const CourseSlider = ({courses}) => {
  return (
    <div>
        {
            courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3,}
                    }}>
                    {
                        courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CatalogCards course={course} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ): (
                <p className=' text-2xl text-center text-richblack-25 my-6'>No Course Found</p>
            )
        }
    </div>
  )
}
