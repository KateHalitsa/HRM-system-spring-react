import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeeWorkplace} from "../model/EmployeeWorkplace.model";

interface EmployeeWorkplaceListState {
    employeeWorkplaces: EmployeeWorkplace[];
}

class EmployeeWorkplaceList extends Component<{}, EmployeeWorkplaceListState> {

    constructor(props: {}) {
        super(props);
        this.state = { employeeWorkplaces: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.employeeWorkplaces.list().then(
            employeeWorkplaces => {

                this.setState({employeeWorkplaces: employeeWorkplaces});
            }
        )
    }

    async remove(id: number) {
        accessServerAPI.employeeWorkplaces.delete(id).then(() => {
            const updatedEmployeeWorkplaces: EmployeeWorkplace[] = [...this.state.employeeWorkplaces].filter(i => i.id !== id);
            this.setState({ employeeWorkplaces: updatedEmployeeWorkplaces });
        });
    }

    render() {
        const { employeeWorkplaces } = this.state;

        const employeePositionsList: ReactNode = employeeWorkplaces.map(employeeWorkplace => {
            return (
                <tr key={employeeWorkplace.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{employeeWorkplace.employeeId}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link}
                                    to={"/employee_workplace/" + employeeWorkplace.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline
                                    onClick={() => this.remove(employeeWorkplace.id)} className="py-0">Удалить</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Назначения</h5>
                    <Table striped hover size="sm">
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/employee_workplace/new" className="py-0">
                                    Добавить назначение
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

export default EmployeeWorkplaceList;