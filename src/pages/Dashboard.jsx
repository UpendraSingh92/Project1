import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/core/Dashboard/SideBar";

export const Dashboard = () => {
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
          <SideBar />
          <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
