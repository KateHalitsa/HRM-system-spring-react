import { auth } from "./Auth";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import React from "react";

type NavItemProps = {
    to: string;
    name: string;
}

export const PrivateNavItem = ({to, name}: NavItemProps) => {
    const itemPath: string = to;
    const itemName: string = name;
    const isCanAccess: boolean = auth.canAccess(itemPath);

    if (isCanAccess)
    {
        return (
            <NavItem>
                <NavLink to={itemPath} className="nav-link">{itemName}</NavLink>
            </NavItem>
        )
    }
    return <></>;
}

export const CommonNavItem = ({to, name}: NavItemProps) => {
    return (
        <NavItem>
            <NavLink to={to} className="nav-link">{name}</NavLink>
        </NavItem>
    );
}

