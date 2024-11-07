import React, {Component, MouseEventHandler, RefObject} from 'react';
import { Link } from 'react-router-dom';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import axios from "axios";
import {User} from "../model/user.model";
import accessServerAPI from "../model/AccessServerAPI";
import {auth} from "../PrivateRouteUtils/Auth";

interface LoginPageProps extends WithRouterProps {}

interface LoginPageState {
    errorMessage: string;
    username: string;
    password: string;
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {

    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            errorMessage: '',
            username: '',
            password: ''
        };
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    async componentDidMount() {
    }

    onChangeUserName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({...this.state, username: event.target.value});
    }

    onChangePassword(event: React.ChangeEvent<HTMLInputElement>): void
    {
        this.setState({...this.state, password: event.target.value});
    }

    checkLogin() {

        let from = this.props.location.state || "/" ;

        accessServerAPI.loginUtils.login(this.state.username, this.state.password)
       .then(userInfo  => {
            if (Object.keys(userInfo).length > 0)
            {
                auth.setUserInfo(userInfo);
                this.props.navigate(from);
            }
            else
            {
                this.setState({...this.state,
                    errorMessage: 'Пользователь или пароль не верны',
                });
            }
        }).catch(err =>
        {
            this.setState({...this.state,
                errorMessage: err.message});
        });
    }

    render() {
        const myState = this.state;
        let errorMessage = this.state.errorMessage;
        if (errorMessage !== ""){
            errorMessage = "Ошибка входа: " + errorMessage;
        }
        const isLoginFailed = errorMessage !== "";


        return (
            <div>
                <AppNavbar/>
                <Container fluid className="align-content-center mt-2 text-center">

                <Card color="light"  className="mt-2 p-0">
                    <CardHeader className='p-1'>Вход</CardHeader>
                    <CardBody className="m-0 pb-0">

                    <Form autoComplete="off" complete="off" className="mt-1 mb-0 p-0">

                        <FormGroup row>
                            <Label for="username" sm="2" size="sm" className="text-end">Логин:</Label>
                            <Col sm="10">
                                <Input type="text"  autoComplete="off" bsSize="sm" id="username" name="username"
                                       value={this.state.username} onChange={this.onChangeUserName}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="my-0">
                            <Label for="password" sm="2" size="sm" className="text-end">Пароль:</Label>
                            <Col sm="10">
                                <Input type="password"  id="password" name="password"  autoComplete="off" complete="off" bsSize="sm"
                                       value={this.state.password} onChange={this.onChangePassword}/>
                            </Col>
                        </FormGroup>

                        { isLoginFailed &&
                        <FormGroup row className="my-0">
                            <Label sm="2" size="sm" ></Label>
                            <Col sm="10">
                            <div className="alert alert-danger mb-0 p-1 text-start ps-2" role="alert">
                                {errorMessage}
                            </div>
                            </Col>
                        </FormGroup>
                        }

                        <FormGroup row className="my-0 justify-content-center ">
                                <Button outline size="sm" color="primary" className="col-sm-auto" type="button"
                                        onClick={() => this.checkLogin()}>Войти</Button>
                        </FormGroup>


                    </Form>
                    </CardBody>
                </Card>
                </Container>
            </div>
        )
    }
}

export default withRouter(LoginPage);


/*
import React, { FC } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "./PrivateRouteUtils/Auth";
import AppNavbar from "./AppNavbar";

interface LocationState {
    state?: {
        from: {
            pathname: string;
        };
    };
}

const LoginPage: FC = () => {
    const navigate: (path: string) => void = useNavigate();
    const location: LocationState = useLocation();
    console.log({ location });

    const { from } = location.state || { from: { pathname: "/" } };
    const login = (): void => {
        auth.login(() => {
            navigate(from.pathname);
        });
    };

    return (
        <div>
            <AppNavbar/>
            {/*
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={login}>Log in</button>
            * /}
            <Container fluid className="align-content-center mt-2 text-center">
            <div className="container shadow-sm ps-0 pe-0 pb-1" style={{backgroundColor: #fcfcf}}>

                <h6 className='text-center p-1' style={{backgroundColor: #f2f5ff}}>Логин</h6>

                <Form autocomplete="off" class="mt-3">

                    <div class="row mb-1">
                        <Label className="col-sm-2 col-form-label col-form-label-sm text-end" for="username">Логин:</Label>
                        <div className="col-sm-9 g-0">
                            <Input type="text" className="form-control form-control-sm" id="username"
                                   name="username" [(ngModel)]="username" autocomplete="off"/>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <Label className="col-sm-2 col-form-label  col-form-label-sm text-end"
                               for="password">Пароль:</Label>
                        <div className="col-sm-9 g-0">
                            <Input type="password" class="form-control form-control-sm col-sm-10" id="password"
                                   name="password" [(ngModel)]="password" autocomplete="off"/>
                        </div>
                    </div>

                    @if (isLoginFailed) {
                    <div class="row mb-2">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-9 alert alert-danger g-0 m-0 p-1 ps-2" role="alert">
                            Ошибка логина: {{errorMessage}}
                        </div>
                    </div>
                }

                    <div class="row justify-content-center mt-2">
                        <a class="link-success col-sm-auto" routerLink="/teacher-registration">Регистрация учителя</a>
                        <a class="link-success col-sm-auto" routerLink="/student-registration">Регистрация ученика</a>
                        <Button class="btn btn-success col-sm-auto btn-sm" type="submit" (click)="checkLogin()">Войти</Button>
                        <br>
                    </div>

            </Form>

        </div>
    </Container>


</div>
)
    ;
}

export default LoginPage; */