import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileDropDown } from "../core/Auth/ProfileDropDown";
import  {apiConnector}  from "../../services/apiConnector";
import { categories } from "../../services/apis";

export const Navbar = () => {
  // fetch slices
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [openHam,setOpenHam] = useState(false);
  const [catalogLink, setCatalogLink] = useState([]);

  const location = useLocation();
  function match(givenpath) {
    // console.log(location.pathname, givenpath);
    return matchPath({ path: givenpath }, location.pathname);
  }

  useEffect( ()=> {
     setOpenHam(false);
  },[location.pathname])

  useEffect( () => {
    fetchSublink();
  },[]);

  const fetchSublink = async () => {
    
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      //console.log(result);
      setCatalogLink(result.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const sublink = [
    {
      title: "python",
      link: "/catalog/python",
    },
    {
      title: "wed dev",
      link: "/catalog/wed-development",
    },
  ];

  return (
    <div className="font-inter w-11/12 mx-auto px-3 py-3 text-richblack-100 flex items-center justify-between ">
      <div>
        <img alt="logo" src={Logo} width={160} loading="lazy" height={42} />
      </div>

      <div className="hidden md:flex gap-6">
        <Link
          className={`font-semibold hover:text-yellow-100 ${
            match("/") ? "text-yellow-100" : ""
          }`}
          to={"/"}
        >
          Home
        </Link>
        <div
          className={`font-semibold hover:text-yellow-100 relative flex gap-1 items-center group`}
        >
          Catalog <MdOutlineKeyboardArrowDown size={"20px"} />
          <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[35%] top-[50%] flex flex-col gap-1 rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-max sm:w-[200px] lg:w-[300px] z-10">
            <div className="absolute left-[50%] top-0 translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>

            {catalogLink.length > 0 && catalogLink.map((val, index) => {
              return (
                <Link
                  to={`/catalog/${val.name.split(" ").join("-").toLowerCase()}`}
                  className="text-black font-normal text-lg px-3 py-2 rounded-lg hover:bg-richblack-50 cursor-pointer"
                  key={index}
                >
                  {val.name}
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          className={`font-semibold hover:text-yellow-100 ${
            match("/aboutus") ? "text-yellow-100" : ""
          }`}
          to={"/aboutus"}
        >
          About us
        </Link>
        <Link
          className={`font-semibold hover:text-yellow-100 ${
            match("/contactus") ? "text-yellow-100" : ""
          }`}
          to={"/contactus"}
        >
          Contact us
        </Link>
      </div>

      {/* nav 3rd section */}
      <div>
        {user && (
          <div className="hidden md:flex gap-4 items-center">
            <div className="text-richblack-25">
              {/* user is login */}
              <Link to={"/dashboard/cart"}>
                <BsCartCheck className="text-2xl"></BsCartCheck>
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            </div>
            <ProfileDropDown></ProfileDropDown>
          </div>
        )}

        {!token && (
          <div className="hidden md:flex gap-4">
            {/* user not login */}
            <Link to={"/login"}>
              <button className="hover:text-richblack-25 bg-richblack-700 px-3 py-1 rounded-md border-[1px]">
                Log in
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="hover:text-richblack-25 bg-richblack-700 px-3 py-1 rounded-md border-[1px]">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Ham Menu */}
      <div className="flex md:hidden gap-5 items-center">
          
        {/* login sucess full section */}
      <div>
        {user && (
          <div className="flex gap-4 items-center">
            <div className="text-richblack-25">
              {/* user is login */}
              <Link to={"/dashboard/cart"}>
                <BsCartCheck className="text-2xl"></BsCartCheck>
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            </div>
            <ProfileDropDown></ProfileDropDown>
          </div>
        )}
      </div>
        <FiMenu className="text-3xl cursor-pointer" onClick={()=> setOpenHam(!openHam)} ></FiMenu>
        {
          openHam && (
            <div className={`rounded-sm top-14 right-0 w-[200px] py-1 h-max bg-richblack-700 z-20 fixed `}>

        {/* middle links of navbar */}
        <div className="flex p-2 gap-3 flex-col">
        <Link
          className={`text-richblack-50 hover:text-richblack-5 font-semibold bg-richblack-400 px-3 py-1 rounded-sm border-richblack-100 text-center`}
          // className={`font-semibold hover:text-yellow-100 ${match("/") ? "text-yellow-100" : ""}`}
          to={"/"}
        >
          Home
        </Link>
        <div
        className={`text-richblack-50 hover:text-richblack-5 font-semibold bg-richblack-400 px-3 py-1 rounded-sm border-richblack-100 text-center flex gap-1 justify-center group`}
          // className={`font-semibold hover:text-yellow-100 relative flex gap-1 items-center group`}
        >
          Catalog <MdOutlineKeyboardArrowDown size={"20px"} />
          <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[35%] top-[20%] flex flex-col gap-1 rounded-md bg-richblack-5 p-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-max sm:w-[150px] lg:w-[200px] z-30">
            <div className="absolute left-[50%] top-0 translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>

            {catalogLink.length > 0 && catalogLink.map((val, index) => {
              return (
                <Link
                  to={`/catalog/${val.name.split(" ").join("-").toLowerCase()}`}
                  className="text-black font-normal text-lg px-3 py-2 rounded-lg hover:bg-richblack-50 cursor-pointer"
                  key={index}
                >
                  {val.name}
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          className={`text-richblack-50 hover:text-richblack-5 font-semibold bg-richblack-400 px-3 py-1 rounded-sm border-richblack-100 text-center`}
          // className={`font-semibold hover:text-yellow-100 ${match("/aboutus") ? "text-yellow-100" : ""}`}
          to={"/aboutus"}
        >
          About us
        </Link>
        <Link
          className={`text-richblack-50 hover:text-richblack-5 font-semibold bg-richblack-400 px-3 py-1 rounded-sm border-richblack-100 text-center`}
          //className={`font-semibold hover:text-yellow-100 ${match("/contactus") ? "text-yellow-100" : ""}`}
          to={"/contactus"}
        >
          Contact us
        </Link>
        </div>

        {/* login and signup button */}
        {token === null && (
          <div className="flex p-2 gap-2 flex-col">
            {/* user not login */}
            <Link to={"/login"} className="text-richblack-50 hover:text-richblack-5 font-semibold bg-richblack-400 px-3 py-1 rounded-sm border-richblack-100 text-center">
                Log in
            </Link>
            <Link to={"/signup"} className="text-richblack-50 hover:text-richblack-5 font-semibold bg-richblack-400 px-3 py-1 rounded-sm border-richblack-100 text-center">
                Sign up
            </Link>
          </div>
        )}
        </div>
          )
        }
      </div>
    </div>
  );
};
