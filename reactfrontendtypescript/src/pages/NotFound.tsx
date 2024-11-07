import React, { Component, ReactNode } from 'react';
import '../App.css';
import AppNavbar from '../components/AppNavbar';
import { Container } from 'reactstrap';
import Error404 from '../images/error-404.png';
import { withRouter, WithRouterProps } from "../PrivateRouteUtils/RouterUtils";


interface NotFoundProps extends WithRouterProps {}

class NotFound extends Component<NotFoundProps> {
    render(): ReactNode {
        return (
            <div>
                <AppNavbar/>
                <Container fluid className="align-content-center text-center">
                    <br/>
                    <img src={Error404} alt="404 Not Found"/>
                    <br/><br/>
                    <h4>Ресурс "<b style={{color : "blue"}}>{this.props.location.pathname}</b>" не найден</h4>
                </Container>
            </div>
        );
    }
}

export default withRouter(NotFound);