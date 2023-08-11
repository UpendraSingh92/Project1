
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {SideBar} from "../components/core/Dashboard/SideBar";

export const Dashboard = () => {
    const {loading:authLoading} = useSelector( (state)=> state.auth)
    const {loading:profileLoading} = useSelector( (state)=> state.profile)
  return (
    <div>
        {
            authLoading || profileLoading ? <div>spinner</div> :
            <div>
                <SideBar/>
                <Outlet></Outlet>
            </div>
        }
    </div>
  )
}
