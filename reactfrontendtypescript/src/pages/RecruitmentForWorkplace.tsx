import React, { Component, ReactNode } from 'react';
import {Button, ButtonGroup, Container, Input, Label, Table} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeeEfficiencyTable} from "../model/EmployeeEfficiencyTable.model";

interface RecruitmentForWorkplaceState {
    efficiencyTable: EmployeeEfficiencyTable;
}

class RecruitmentForWorkplace extends Component<{}, RecruitmentForWorkplaceState> {

    constructor(props: {}) {
        super(props);
        this.state = { efficiencyTable: new EmployeeEfficiencyTable() };
        //this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.employeeEfficiency.load().then(
            foundEfficiencyTable => this.setState({ efficiencyTable: foundEfficiencyTable })
        )
    }

    render() {
        const { efficiencyTable } = this.state;
        const workplaceList = efficiencyTable.workplaces;
        const employeeList = efficiencyTable.employees;
        const valueList = efficiencyTable.cells;

        const tableHeader: ReactNode = workplaceList.map(workplace => {
            return (
                <th /*style={{writingMode:"vertical-lr", rotate: "180deg" }}*/>
                    <Input type="checkbox" id={"w_" + workplace.id} className="me-1"/>
                    <Label for={"w_" + workplace.id} size="sm" className="py-0">
                        {workplace.name}
                    </Label>
                </th>
            );
        })

        const getCellValue = (employeeId: number, workplaceId: number) =>{
            const cellValue = valueList.find(value => value.employeeId === employeeId && value.workplaceId === workplaceId);
            if (cellValue) {
                return cellValue.efficiency.toString();
            }else{
                return ' ';
            }
        }

        const cells = (employeeId: number) => {
            return workplaceList.map(workplace =>{
            return (<td title={"employeeId =" + employeeId+ ", workplaceId ="  + workplace.id} >{getCellValue(employeeId, workplace.id)}</td>);
            });
        };

        const tableBody: ReactNode = employeeList.map(employee => {
            return (
                <tr>
                    <td>
                        <Input type="checkbox" id={"e_" + employee.id} className="me-1"/>
                        <Label size="sm" className="py-0" for={"e_" + employee.id}>{employee.lastName + " " + employee.firstName}</Label>
                    </td>
                    {
                        cells(employee.id)
                    }
                </tr>
            );
        })

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Таблица назначений</h5>
                    <Table striped hover bordered size="sm">
                        <thead>
                        <tr>
                            <th/>{tableHeader}
                        </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default RecruitmentForWorkplace;