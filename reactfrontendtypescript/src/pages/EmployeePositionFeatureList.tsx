import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import {EmployeePositionFeature} from "../model/EmployeePositionFeature.model";
import accessServerAPI from "../model/AccessServerAPI";

interface EmployeePositionFeatureListState {
    features: EmployeePositionFeature[];
}

class EmployeePositionFeatureList extends Component<{}, EmployeePositionFeatureListState> {

    constructor(props: {}) {
        super(props);
        this.state = { features: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.features.list().then(
            foundEmployeePositionFeatures => this.setState({ features: foundEmployeePositionFeatures })
        )
    }

    async remove(id: number) {
        accessServerAPI.features.delete(id).then(() => {
            const updatedEmployeePositionFeatures: EmployeePositionFeature[] = [...this.state.features].filter(i => i.id !== id);
            this.setState({ features: updatedEmployeePositionFeatures });
        });
    }

    render() {
        const { features } = this.state;

        const featureList: ReactNode = features.map(feature => {
            return (
                <tr key={feature.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{feature.name}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link} to={"/employee_position_feature/" + feature.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline onClick={() => this.remove(feature.id)} className="py-0">Удалить</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Должности</h5>
                    <Table striped hover size="sm">
                        <thead>
                        <tr>
                            <th>Название</th>

                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/employee_position_feature/new" className="py-0">
                                    Добавить должность
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {featureList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EmployeePositionFeatureList;