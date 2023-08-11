

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    
    const {token} = useSelector( (state)=> state.auth);
    return <div>{
        (token !== null) ? <div>{children}</div> : <Navigate to={"/login"}></Navigate>
        
    }</div>;
};
