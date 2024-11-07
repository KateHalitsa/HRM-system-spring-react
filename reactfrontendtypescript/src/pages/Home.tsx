import React, {Component, ReactNode} from 'react';
import '../App.css';
import AppNavbar from '../components/AppNavbar';
import { Container } from 'reactstrap';
import PodborPersonala from '../images/podbor-personala.jpg';

class Home extends Component {
    render(): ReactNode {
        return (
            <div>
                <AppNavbar />
                <Container fluid className="align-content-center mt-2 text-center">
                    <h2>Оптимальный подбор должностей сотрудников</h2>
                    <img src={PodborPersonala} alt="Оптимальный подбор должностей сотрудников" />
                </Container>
            </div>
        );
    }
}

export default Home;

