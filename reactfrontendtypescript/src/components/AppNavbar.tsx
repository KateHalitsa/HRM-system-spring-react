import React, { Component, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, Button } from 'reactstrap';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import lLogoEmployees from '../images/employees.png';
import { auth } from "../PrivateRouteUtils/Auth";
import {PrivateNavItem, CommonNavItem}  from "../PrivateRouteUtils/PrivateNavItem";

interface AppNavbarProps {
    [key: string]: any; // Allow any additional props
}

const AppNavbar: React.FC<AppNavbarProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);
    const location = useLocation();
    const navigate = useNavigate();

    console.log({ location });
    // let { from } = location.state || { from: { pathname: "/" } };

    const ClickLogout = () => {
        const rootPage = { pathname: "/" };
        auth.logout(() => {
            navigate(rootPage);
        });
    }

    const ClickLogin = () => {
        const rootPage = { pathname: "/" };
        auth.logout(() => {
            navigate("/login", {state: location.pathname});
        });
    }

    return (
        <Navbar {...args} color="primary" dark expand="sm" container="fluid" className="sticky-top p-0">
            <NavbarBrand tag={Link} to="/" className="m-0 pt-1">
                <img src={lLogoEmployees} title="Сотрудники: Оптимальный выбор должностей сотрудников" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <CommonNavItem to="/" name="Главная" />
                    <PrivateNavItem to="/personal" name="Личный кабинет" />
                    <PrivateNavItem to="/users" name="Пользователи" />
                    <PrivateNavItem to="/employees" name="Сотрудники" />
                    <PrivateNavItem to="/employee_position" name="Должности" />
                </Nav>
                {
                    auth.isAuthenticated() ? (
                        <Nav>
                            <NavbarText className="me-2 pt-0 pb-1" title={auth.getUserInfo().email}><b>{auth.getUserInfo().username}</b></NavbarText>
                            <Button onClick={ClickLogout} color="light" outline size="sm" className="py-0">Выход</Button>
                        </Nav>
                    ) : (
                        <Button onClick={ClickLogin} outline color="light"  className="py-0">Вход</Button>
                    )
                }
            </Collapse>
        </Navbar>
    );
}

export default AppNavbar;

