import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operation/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { SideBarLink } from "./SideBarLink";
import {VscSignOut} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../common/ConfirmModal";

export const SideBar = () => {
  const { user, profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div>spinner</div>;
  }
  return (
    <div className="text-white">
      {sidebarLinks.map((value, index) => {
        if (value.type === user.accountType || value.type === "All") {
          return (
            <SideBarLink
              key={index}
              path={value.path}
              iconName={value.icon}
              linkName={value.name}
            />
          );
        }
      })}

      <div className="h-[0.5px] bg-white my-5"></div>
      <SideBarLink
        key={7}
        path={"dashboard/setting"}
        iconName={"VscSettingsGear"}
        linkName={"Setting"}
      />

      <button
      className="flex gap-2"
        onClick={() =>
          setModal({
            text1: "Are You Sure ?",
            text2: "You will be Logged out of Your Account",
            btn1: "Logout",
            btn2: "cancel",
            handler1: () => dispatch(logout(navigate)),
            handler2: () => setModal(null),
          })
        }
      >
        <VscSignOut/>
        Logout
      </button>

      {modal && <ConfirmModal modalData={modal}></ConfirmModal>}
    </div>
  );
};
