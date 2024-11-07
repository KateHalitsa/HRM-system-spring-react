import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AccessDenied from "../pages/AccessDenied";
import {auth} from "./Auth";

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    let path = location.pathname;

    let AccessResult = auth.canAccess(path);
    if(AccessResult) {
        return children;
    } else {
        return <AccessDenied/>;
    }
};