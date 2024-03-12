import React from 'react'
import { Fotter } from '../components/common/Fotter'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { getCategoryPage } from '../services/operation/catalogAPI';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { CatalogCards } from "../components/core/Catalog/CatalogCards"

export const Catalog = () => {

    const {catalogname} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState(null);
    const [active, setActive] = useState(1);

    useEffect( ()=> {
        const categoryIdFetch = async () => {
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            //console.log(typeof(response.data.category[0].name));
            const category_id = response.data.category.filter( (ct)=> ct.name.split(" ").join("-").toLowerCase() === catalogname)[0]._id;
            setCategoryId(category_id);
        }
        categoryIdFetch();
    },[catalogname]);
    
    useEffect( ()=> {
        const fetchCategoryDetail = async()=> {
            try {
                if(categoryId){
                    const response = await getCategoryPage(categoryId);
                    console.log(response);
                    setCatalogPageData(response);
                }
            } catch (error) {
                console.log(error);
            }
        }     
        fetchCategoryDetail();
    },[categoryId])

    if (!catalogPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] text-white place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!catalogPageData.success) {
    return <h1 className='text-white'>Error</h1>
    }

  return (
    <div className='text-white w-full flex flex-col gap-6 '>

        {/* hero section */}
        <div className='box-content bg-richblack-800 px-4 -mt-10'>
            <div className="mx-auto w-11/12 max-w-[1260px] flex min-h-[260px] flex-col justify-center gap-4 ">
                <p className="text-sm text-richblack-300">Home / Catalog / <span className="text-yellow-25">{catalogPageData?.data?.categoryCourses?.name}</span></p>
                <p className="text-3xl text-richblack-5">{catalogPageData?.data?.categoryCourses?.name}</p>
                <p className='max-w-[870px] text-richblack-200'>{catalogPageData?.data?.categoryCourses?.description}</p>
            </div>
        </div>

        <div className='w-11/12 max-w-[1260px] mx-auto'>
            <p className='text-4xl text-richblack-5 font-semibold'>Course to get you started</p>
            <div className="my-8 flex border-b border-b-richblack-600 text-sm">
            <p
                className={`px-4 py-2 ${
                  active === 1 ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50 border-b-richblack-25"} cursor-pointer`}
                onClick={() => setActive(1)}>Most Populer</p>
              <p className={`px-4 py-2 ${
                  active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50 border-b-richblack-25"} cursor-pointer`}
                onClick={() => setActive(2)}>New</p>
            </div>
            <CourseSlider courses={catalogPageData?.data?.categoryCourses?.course}/>
        </div>
        <div className='w-11/12 mt-10 max-w-[1260px] mx-auto'>
            <p className='text-4xl text-richblack-5 font-semibold'>Top Courses in {catalogPageData?.data?.categoryCourses?.name}</p>
            <div className="mt-8">
                <CourseSlider courses={catalogPageData?.data?.diffCategoryCourse?.course}/>
            </div>
        </div>
        
        {/* Section 3 */}
        
        {/* catalogPageData?.data?.mostSellingCourses[0] !== null ? 
          
          <div className=" mx-auto box-content w-11/12 max-w-[1260px] ">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    
                      course !== null ? <CatalogCards course={course} key={i} Height={"h-[400px]"} /> : <></>
                    
                    // <></>
                  ))}
              </div>
            </div>
          </div>
        : 
          <></>
        */}

        <Fotter/>
    </div>
  )
}
