import React, {Component} from 'react';
import '../App.css';
import AppNavbar from '../components/AppNavbar';
import {Container, Navbar} from 'reactstrap';
import {NavLink, Outlet} from "react-router-dom";

class Personal extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <AppNavbar />
                <Container fluid className="align-content-center m-0 p-0 text-center ">
                    <div className="container-fluid p-0">
                        <div className="row mt-1 me-1">
                            <div className="col-2 ps-1 pe-0">
                                <Navbar dark className="list-group list-group-flush p-0 ms-0">
                                    <NavLink to="account" className="nav-link list-group-item list-group-item-action">Авторизация</NavLink>
                                    <NavLink to="history" className="nav-link list-group-item list-group-item-action">Карьера</NavLink>
                                    <NavLink to="notifications" className="nav-link list-group-item list-group-item-action">Уведомления</NavLink>
                                </Navbar>
                            </div>
                            <div className="col-10 ps-0 px-0 me-0 text-center align-content-center"  style={{height: "min-content"}}>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Personal;

