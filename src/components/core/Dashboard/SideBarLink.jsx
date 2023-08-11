
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
    //console.log(Icon);
  return (
    <div>
        <NavLink to={path} className="flex items-center gap-2">
            <Icon></Icon>
            <p>{linkName}</p>
        </NavLink>
    </div>
  )
}
