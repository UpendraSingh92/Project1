import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operation/paymentAPI';
import { useDispatch, useSelector } from 'react-redux';

export const CoursePage = () => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state)=> state.auth); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const handleBuyCourse = async() =>{
        if(token){
          buyCourse(token, [courseId], user, navigate, dispatch)
        }
    }
  return (
    <div>
        <button className='bg-yellow-400 text-lg'
            onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div>
  )
}
