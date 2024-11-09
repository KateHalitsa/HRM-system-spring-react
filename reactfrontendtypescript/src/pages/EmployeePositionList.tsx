import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import {dateToDisplayStr, Employee} from "../model/employee.model";
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeePosition} from "../model/EmployeePosition.model";

interface EmployeePositionListState {
    positions: EmployeePosition[];
}

class EmployeePositionList extends Component<{}, EmployeePositionListState> {

    constructor(props: {}) {
        super(props);
        this.state = { positions: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.positions.list().then(
            foundEmployees => this.setState({ positions: foundEmployees })
        )
    }

    async remove(id: number) {
        accessServerAPI.positions.delete(id).then(() => {
            const updatedEmployeesPositions: EmployeePosition[] = [...this.state.positions].filter(i => i.id !== id);
            this.setState({ positions: updatedEmployeesPositions });
        });
    }

    render() {
        const { positions } = this.state;

        const employeePositionsList: ReactNode = positions.map(position => {
            return (
                <tr key={position.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{position.name}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link}
                                    to={"/employee_position/" + position.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline
                                    onClick={() => this.remove(position.id)} className="py-0">Удалить</Button>
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
                                <Button size="sm" color="success" outline tag={Link} to="/employee_position/new" className="py-0">
                                    Добавить должность
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeePositionsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EmployeePositionList;