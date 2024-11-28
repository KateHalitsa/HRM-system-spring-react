import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import {Employee} from "../model/employee.model";
import accessServerAPI from "../model/AccessServerAPI";
import {dateToDisplayStr} from "../components/DateUtils";

interface EmployeeListState {
    employees: Employee[];
}

class EmployeeList extends Component<{}, EmployeeListState> {

    constructor(props: {}) {
        super(props);
        this.state = { employees: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.employees.list().then(
            foundEmployees => this.setState({ employees: foundEmployees })
        )
    }

    async remove(id: number) {
        accessServerAPI.employees.delete(id).then(() => {
            const updatedEmployees: Employee[] = [...this.state.employees].filter(i => i.id !== id);
            this.setState({ employees: updatedEmployees });
        });
    }

    render() {
        const { employees } = this.state;

        const employeeList: ReactNode = employees.map(employee => {
            return (
                <tr key={employee.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{employee.firstName}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{employee.lastName}</td>
                    <td>{dateToDisplayStr(employee.birthday)}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link}
                                    to={"/employees/" + employee.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline
                                    onClick={() => this.remove(employee.id)} className="py-0">Удалить</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Сотрудники</h5>
                    <Table striped hover size="sm">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Дата рождения</th>
                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/employees/new" className="py-0">
                                    Добавить сотрудника
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EmployeeList;