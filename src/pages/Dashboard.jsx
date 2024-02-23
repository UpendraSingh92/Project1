import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AiOutlineMenuUnfold} from 'react-icons/ai'
import { SideBar } from "../components/core/Dashboard/SideBar";
import "./Dashboard.css"

export const Dashboard = () => {

  const [showSidebar, SetShowSidebar] = useState(false);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  return (
    <div className="-mt-10">
      {authLoading || profileLoading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          spinner
        </div>
      ) : (
        <div className="min-h-[calc(100vh-3.5rem)] relative flex">
          <SideBar showSidebar={showSidebar} SetShowSidebar={SetShowSidebar}/>
          <div className={`h-[calc(100vh-3.5rem)] flex-1 overflow-auto dashboard-toggle ${showSidebar? "active" : ""}`}>
          <div className="w-fit lg:hidden absolute top-0" onClick={()=>SetShowSidebar(!showSidebar)}>
              {
                !showSidebar && <AiOutlineMenuUnfold color="white" size={30}/>
              }
            </div>
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
