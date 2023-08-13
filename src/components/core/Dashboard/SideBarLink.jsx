
import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink,matchPath, useLocation } from 'react-router-dom';

export const SideBarLink = ({path,iconName,linkName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const match = (route)=> {
      return ( matchPath({path:route},location.pathname));
    }

    match(path);
  return (
    <div className={`text-lg py-1 pl-8 ${match(path)? "text-yellow-100 border-l-4 bg-yellow-800" : "" }`}>
        <NavLink to={path} className={`flex items-center gap-2`}>
            <Icon></Icon>
            <p>{linkName}</p>
        </NavLink>
    </div>
  )
}
