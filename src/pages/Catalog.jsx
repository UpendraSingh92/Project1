import React from 'react'
import { Fotter } from '../components/common/Fotter'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { getCategoryPage } from '../services/operation/catalogAPI';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';

export const Catalog = () => {

    const {catalogname} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState(null);

    useEffect( ()=> {
        const categoryIdFetch = async()=> {
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = response.data.data.filter( (ct)=> ct.name.split(" ").join("-").toLower() === categoryId)[0]._id;

            setCategoryId(category_id);
            categoryIdFetch();
        }
    },[catalogname]);

    useEffect( ()=> {
        const fetchCategoryDetail = async()=> {
            try {
                const response = await getCategoryPage(categoryId);
                setCatalogPageData(response);
            } catch (error) {
                console.log(error);
            }
        }  
        
        fetchCategoryDetail();
    },[categoryId])

  return (
    <div>
        <div>
            <p>Home/Catalog/<span>{catalogPageData?.data?.selectedCategory?.name}</span></p>
            <p>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
        <div>
            <p>Course to get you started</p>
            <div>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
        </div>
        <div>
            <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
            <div>
                <CourseSlider courses={catalogPageData?.data?.differentCategory?.course}/>
            </div>
        </div>
        <div>
            <p>Frequently buy Courses</p>
        </div>
        <Fotter/>
    </div>
  )
}
