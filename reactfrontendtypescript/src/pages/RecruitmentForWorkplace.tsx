import React, { Component, ReactNode } from 'react';
import {Button, ButtonGroup, Container, Input, Label, Table} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeeEfficiencyCell, EmployeeEfficiencyTable} from "../model/EmployeeEfficiencyTable.model";
import {ErrorPanel} from "../components/CustomControls";

interface ISelectedId {
    [id: number]: boolean;
}

interface RecruitmentForWorkplaceState {
    efficiencyTable: EmployeeEfficiencyTable;
    selectedEmployeeList: ISelectedId;
    selectedWorkplaceList: ISelectedId;
    errorMessage: string;
}

class RecruitmentForWorkplace extends Component<{}, RecruitmentForWorkplaceState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            efficiencyTable: new EmployeeEfficiencyTable(),
            selectedEmployeeList: {},
            selectedWorkplaceList: {},
            errorMessage: ""
        };
        this.onWorkplaceChecked = this.onWorkplaceChecked.bind(this);
        this.onEmployeeChecked = this.onEmployeeChecked.bind(this);
        this.onCalculateClick = this.onCalculateClick.bind(this);
    }

    componentDidMount() {
        accessServerAPI.employeeEfficiency.load().then(
            foundEfficiencyTable =>
            {
                let selectedEmployeeList: ISelectedId = {};
                let selectedWorkplaceList: ISelectedId = {};

                for (const employee of foundEfficiencyTable.employees){
                    selectedEmployeeList[employee.id] = true;
                }
                for (const workplace of foundEfficiencyTable.workplaces){
                    selectedWorkplaceList[workplace.id] = true;
                }

                this.setState({efficiencyTable: foundEfficiencyTable, selectedEmployeeList, selectedWorkplaceList});
            }
        )
    }

    private onWorkplaceChecked(e: React.ChangeEvent<HTMLInputElement>) {
        let selectedWorkplaceList = this.state.selectedWorkplaceList;

        const workplaceStr = e.target.getAttribute('workplaceId')!;
        const workplaceId =  parseInt(workplaceStr);
        selectedWorkplaceList[workplaceId] = e.target.checked;

        this.setState({...this.state, selectedWorkplaceList});
    }

    private onEmployeeChecked(e: React.ChangeEvent<HTMLInputElement>) {
        let selectedEmployeeList = this.state.selectedEmployeeList;

        const employeeStr = e.target.getAttribute('employeeId')!;
        const employeeId =  parseInt(employeeStr);
        selectedEmployeeList[employeeId] = e.target.checked;

        this.setState({...this.state, selectedEmployeeList});
    }

    private validateTable(){
        let errorMessage = "";
        const {efficiencyTable, selectedEmployeeList, selectedWorkplaceList} = this.state;

        let employeeCount = 0;
        for (const e of efficiencyTable.employees){
            if (selectedEmployeeList[e.id]){
                employeeCount = employeeCount + 1;
            }
        }

        let workplaceCount = 0;
        for (const w of efficiencyTable.workplaces){
            if (selectedWorkplaceList[w.id]){
                workplaceCount = workplaceCount + 1;
            }
        }

        if (employeeCount === 0){
            errorMessage = "Выберите сотрудников"
        } else if (workplaceCount === 0){
            errorMessage = "Выберите должности"
        } else if (employeeCount !== workplaceCount){
            errorMessage = `Количество сотрудников (${employeeCount}) не равно количеству должностей (${workplaceCount})`
        }

        this.setState({...this.state, errorMessage});

        return errorMessage === "";
    }

    private onCalculateClick(){
        if (!this.validateTable()){
            return;
        }

        const {efficiencyTable, selectedEmployeeList, selectedWorkplaceList} = this.state;

         let employeeIds: number[] = [];
         let workplaceIds: number[] = [];

        for (const e of efficiencyTable.employees){
            if (selectedEmployeeList[e.id]){
                employeeIds.push(e.id);
            }

        }

        for (const w of efficiencyTable.workplaces){
            workplaceIds.push(w.id);
        }

        accessServerAPI.employeeEfficiency.calc(efficiencyTable.cells, employeeIds, workplaceIds).then(employeeWorkplaceList =>
            {

            }
        );
    }

    render() {
        const { efficiencyTable, selectedEmployeeList, selectedWorkplaceList } = this.state;
        const workplaceList = efficiencyTable.workplaces;
        const employeeList = efficiencyTable.employees;
        const valueList = efficiencyTable.cells;

        const tableHeader: ReactNode = workplaceList.map(workplace => {
            return (
                <th>
                    <Input type="checkbox" id={"w_" + workplace.id} className="me-1"
                           checked={selectedWorkplaceList[workplace.id]}
                           workplaceId = {workplace.id}
                           onChange={this.onWorkplaceChecked}
                    />
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
                        <Input type="checkbox" id={"e_" + employee.id} className="me-1"
                               checked={selectedEmployeeList[employee.id]}
                               employeeId = {employee.id}
                               onChange={this.onEmployeeChecked}
                        />
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
                    <ErrorPanel error={this.state.errorMessage}/>
                    <Button className="py-0 ms-1" size="sm" color="primary" outline onClick={this.onCalculateClick}>Рассчитать назначения</Button>
                </Container>
            </div>
        );
    }

}

export default RecruitmentForWorkplace;