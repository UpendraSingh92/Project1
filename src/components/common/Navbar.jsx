import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  function match(givenpath) {
    console.log(location.pathname, givenpath);
    return matchPath({ path: givenpath }, location.pathname);
  }

  return (
    <div className="font-inter w-11/12 mx-auto px-3 py-3 text-richblack-100 flex items-center justify-between">
      <div>
        <img alt="logo" src={Logo} width={160} loading="lazy" height={42} />
      </div>
      <div className="flex gap-6">
        <Link
          className={`hover:text-yellow-100 ${
            match("/") ? "text-yellow-100" : ""
          }`}
          to={"/"}>Home
        </Link>
        <div className={`hover:text-yellow-100 flex gap-1 items-center`}>
          Catalog <MdOutlineKeyboardArrowDown size={"20px"} />{" "}
        </div>
        <Link
          className={`hover:text-yellow-100 ${
            match("/aboutus") ? "text-yellow-100" : ""
          }`}
          to={"/aboutus"}>About us
        </Link>
        <Link
          className={`hover:text-yellow-100 ${
            match("/contactus") ? "text-yellow-100" : ""
          }`}
          to={"/contactus"}>Contact us
        </Link>
      </div>
      <div className="flex gap-4">
        <button className="hover:text-richblack-25 bg-richblack-700 px-3 py-1 rounded-md border-[1px]">
          Log in
        </button>
        <button className="hover:text-richblack-25 bg-richblack-700 px-3 py-1 rounded-md border-[1px]">
          Sign up
        </button>
      </div>
    </div>
  );
};
