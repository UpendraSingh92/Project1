import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileDropDown } from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

export const Navbar = () => {
  // fetch slices

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [catalogLink, setCatalogLink] = useState([]);

  const location = useLocation();
  function match(givenpath) {
    // console.log(location.pathname, givenpath);
    return matchPath({ path: givenpath }, location.pathname);
  }

  const fetchSublink = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(result);
      setCatalogLink(result.data);
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

  useEffect(() => {
    // fetchSublink();
    console.log(user, token);
  }, []);
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
          to={"/"}
        >
          Home
        </Link>
        <div
          className={`hover:text-yellow-100 relative flex gap-1 items-center group`}
        >
          Catalog <MdOutlineKeyboardArrowDown size={"20px"} />
          <div className="invisible flex flex-col gap-5 absolute left-0 top-[90%] bg-white group-hover:visible w-max h-max z-10">
            {sublink.map((val, index) => {
              return (
                <Link
                  to={val.link}
                  className="text-black cursor-pointer"
                  key={index}
                >
                  {val.title}
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          className={`hover:text-yellow-100 ${
            match("/aboutus") ? "text-yellow-100" : ""
          }`}
          to={"/aboutus"}
        >
          About us
        </Link>
        <Link
          className={`hover:text-yellow-100 ${
            match("/contactus") ? "text-yellow-100" : ""
          }`}
          to={"/contactus"}
        >
          Contact us
        </Link>
      </div>

      {/* nav 3rd section */}
      <div className="flex gap-4">
        {user && (
          <div>
            <div className="text-richblack-25">
              {/* user is login */}
              <Link to={"/dashboard"}>
                <BsCartCheck></BsCartCheck>
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            </div>
            <ProfileDropDown></ProfileDropDown>
          </div>
        )}

        {token === null && (
          <div>
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
    </div>
  );
};
