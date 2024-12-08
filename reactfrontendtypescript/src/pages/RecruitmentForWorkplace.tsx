import React, { Component, ReactNode } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Table} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeeEfficiencyTable} from "../model/EmployeeEfficiencyTable.model";
import {ErrorPanel, InputWithLabel} from "../components/CustomControls";
import {EmployeeWorkplace} from "../model/EmployeeWorkplace.model";
import {LookupSelector} from "../components/LookupSelector";
import {dateToISOStr} from "../components/DateUtils";

interface ISelectedId {
    [id: number]: boolean;
}

interface RecruitmentForWorkplaceState {
    selectedProjectId: number;
    selectedProjectDate: Date;
    findErrorMessage: string;
    efficiencyTable: EmployeeEfficiencyTable;
    selectedEmployeeList: ISelectedId;
    selectedWorkplaceList: ISelectedId;
    errorMessage: string;
    employeeWorkplaceList: EmployeeWorkplace[];
    contractFromDate: Date;
    contractToDate: Date;
    contractErrorMessage: string;
}

class RecruitmentForWorkplace extends Component<{}, RecruitmentForWorkplaceState> {

    constructor(props: {}) {
        super(props);
        this.initState();
        this.onChangeProjectId = this.onChangeProjectId.bind(this);
        this.onChangeProjectDate = this.onChangeProjectDate.bind(this);
        this.onFindClick = this.onFindClick.bind(this);
        this.onWorkplaceChecked = this.onWorkplaceChecked.bind(this);
        this.onEmployeeChecked = this.onEmployeeChecked.bind(this);
        this.onCalculateClick = this.onCalculateClick.bind(this);

        this.onChangeContractFromDate = this.onChangeContractFromDate.bind(this);
        this.onChangeContractToDate = this.onChangeContractToDate.bind(this);
        this.onApplyRecruitmentClick = this.onApplyRecruitmentClick.bind(this);

    }

    initState() {
        this.state  = {
            selectedProjectId: 0,
            selectedProjectDate: new Date(),
            findErrorMessage: "",
            efficiencyTable: new EmployeeEfficiencyTable(),
            selectedEmployeeList: {},
            selectedWorkplaceList: {},
            errorMessage: "",
            employeeWorkplaceList: [],
            contractFromDate: new Date(),
            contractToDate: new Date(),
            contractErrorMessage: ""
        };
        this.setState(this.state);
    }


    componentDidMount() {
    }

    loadEmployeeEfficiencyTable(){
        const {selectedProjectId, selectedProjectDate} = this.state;
        accessServerAPI.employeeEfficiency.load(selectedProjectId, selectedProjectDate).then(
            foundEfficiencyTable =>
            {
                let selectedEmployeeList: ISelectedId = {};
                let selectedWorkplaceList: ISelectedId = {};
                let employeeWorkplaceList: EmployeeWorkplace[] = []; // Очистить предыдущие результаты расчетов;

                for (const employee of foundEfficiencyTable.employees){
                    selectedEmployeeList[employee.id] = true;
                }
                for (const workplace of foundEfficiencyTable.workplaces){
                    selectedWorkplaceList[workplace.id] = true;
                }

                this.setState({...this.state, efficiencyTable: foundEfficiencyTable, selectedEmployeeList, selectedWorkplaceList, employeeWorkplaceList});
            }
        )
    }

    onChangeProjectId(newId: number){
        this.setState({...this.state, selectedProjectId: newId});
    }

    onChangeProjectDate(event: React.ChangeEvent<HTMLInputElement>)
    {
        let selectedProjectDate = event.target.valueAsDate!;
        this.setState({...this.state, selectedProjectDate});
    }

    onChangeContractFromDate(event: React.ChangeEvent<HTMLInputElement>)
    {
        let contractFromDate = event.target.valueAsDate!;
        this.setState({...this.state, contractFromDate});
    }

    onChangeContractToDate(event: React.ChangeEvent<HTMLInputElement>)
    {
        let contractToDate = event.target.valueAsDate!;
        this.setState({...this.state, contractToDate});
    }


    private validateFindParams(): Boolean
    {

        let {selectedProjectId, selectedProjectDate,
            efficiencyTable, employeeWorkplaceList} = this.state;

        let findErrorMessage = "";
        if (selectedProjectId <= 0){
            findErrorMessage = "Выберите проект";
        } else if (selectedProjectDate === null){
            findErrorMessage = "Заполните дату набора";
        }

        if (findErrorMessage !== "")
        {
            efficiencyTable = new EmployeeEfficiencyTable(); // Очистить предыдущую таблицу назначений
            employeeWorkplaceList = []; // Очистить предыдущие результаты расчетов
        }

        this.setState({...this.state, findErrorMessage, efficiencyTable, employeeWorkplaceList});

        return findErrorMessage === "";
    }

    private onFindClick(): void
    {
        if (!this.validateFindParams()){
            return;
        }

        this.loadEmployeeEfficiencyTable();
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

        let employeeWorkplaceList = this.state.employeeWorkplaceList;
        if (errorMessage !== "")
        {
            employeeWorkplaceList = []; // Очистить предыдущие результаты расчетов
        }

        this.setState({...this.state, errorMessage, employeeWorkplaceList});

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
            if (selectedWorkplaceList[w.id]){
                workplaceIds.push(w.id);
            }
        }

        accessServerAPI.employeeEfficiency.calc(efficiencyTable.cells, employeeIds, workplaceIds).then(employeeWorkplaceList =>
            {
                const contractFromDate = this.state.selectedProjectDate;

                let contractToDate = new Date(contractFromDate);
                contractToDate.setFullYear(contractToDate.getFullYear() + 1);

                this.setState({...this.state, employeeWorkplaceList, contractFromDate, contractToDate});
            }
        );
    }

    private validateContactParams(): Boolean
    {
        let {contractFromDate, contractToDate} = this.state;

        let contractErrorMessage = "";
        if (contractFromDate === null){
            contractErrorMessage = "Выберите дату начала контракта";
        } else if (contractToDate === null){
            contractErrorMessage = "Выберите дату завершения контракта";
        } else if (contractFromDate >= contractToDate){
            contractErrorMessage = "Дата завершения контракта должна быть больше даты начала контракта";
        }

        this.setState({...this.state, contractErrorMessage});
        return contractErrorMessage === "";
    }
    private onApplyRecruitmentClick(){
        if (!this.validateContactParams()){
            return;
        }

        let {employeeWorkplaceList, contractFromDate, contractToDate} = this.state;
        for (let item of employeeWorkplaceList){
            item.fromDate = contractFromDate;
            item.toDate = contractToDate;
        }

        accessServerAPI.employeeEfficiency.apply(employeeWorkplaceList).then( res =>
            {
                this.initState();
            }
        );
    }

    render() {
        const {
            selectedProjectId, selectedProjectDate,
            efficiencyTable, selectedEmployeeList,  selectedWorkplaceList,
            employeeWorkplaceList,
            contractFromDate, contractToDate
        } = this.state;

        const workplaceList = efficiencyTable.workplaces;
        const employeeList = efficiencyTable.employees;
        const valueList = efficiencyTable.cells;

        const getEmployeeName = (id: number) =>{
            const employee = employeeList.find(e => e.id === id);
            if (employee === undefined){
                return "Employee=" + id;
            }
            else
            {
                return employee.lastName + " " + employee.firstName;
            }
        }

        const getWorkplaceName = (id: number) =>{
            const workplace = workplaceList.find(e => e.id === id);
            if (workplace === undefined){
                return "Workplace=" + id;
            }
            else
            {
                return workplace.name;
            }
        }

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

        const  efficiencyTableIsEmpty = (efficiencyTable.workplaces.length === 0) && (efficiencyTable.employees.length === 0)
        const efficiencyTablePresentation = !efficiencyTableIsEmpty?(
            <Card color="light" className="m-3 mt-0">
                <CardHeader className='py-1 m-0 navbar'>
                    <b>Таблица расчета назначений</b>
                </CardHeader>
                <CardBody className="m-0 text-start">

                    <Table striped hover bordered size="sm" className="mb-2">
                        <thead>
                        <tr>
                            <th/>
                            {tableHeader}
                        </tr>
                        </thead>
                        <tbody>
                        {tableBody}
                        </tbody>
                    </Table>

                    <div className="row mb-1">
                        <Col sm="9">
                            <ErrorPanel error={this.state.errorMessage} leftSpace={false}/>
                        </Col>
                        <Col sm="3" style={{textAlign: "right"}}>
                            <Button className="ms-1" size="sm" color="primary" outline
                                    onClick={this.onCalculateClick}>
                                Рассчитать назначения
                            </Button>
                        </Col>
                    </div>
                </CardBody>
            </Card>
        ):(
            <></>
        );

        const employeeWorkplaceListPresentation = employeeWorkplaceList.length > 0?(

            <Card color="light" className="m-3 mt-0">
                <CardHeader className='py-1 m-0 navbar' >
                    <b>Результат расчета назначений</b>
                </CardHeader>
                <CardBody className="m-0 text-start">
                    <Table striped hover bordered size="sm" className="mb-2">
                        <thead>
                        <tr>
                            <th>Сотрудник</th>
                            <th>Предлагаемая должность</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeWorkplaceList.map(e =>
                            <tr>
                                <td>{getEmployeeName(e.employeeId)}</td>
                                <td>{getWorkplaceName(e.workplaceId)}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                    <b>Заключить контракт на период</b>
                    <InputWithLabel label="Дата начала контракта:" id="contractFromDate" value={dateToISOStr(contractFromDate)}
                                    type="date" onChange={this.onChangeContractFromDate}/>
                    <InputWithLabel label="Дата завершения контракта:" id="contractToDate" value={dateToISOStr(contractToDate)}
                                    type="date" onChange={this.onChangeContractToDate}/>
                    <ErrorPanel error={this.state.contractErrorMessage}/>
                    <div className="text-end mt-2">
                        <Button className="ms-1" size="sm" color="primary" outline
                                onClick={this.onApplyRecruitmentClick}>
                            Применить назначения
                        </Button>
                    </div>

                </CardBody>
            </Card>
        ) : (
            <></>
        );

        return (
            <div>
                <AppNavbar/>
                <Container fluid className="pt-2">
                    <Card color="light" className="m-3 mt-0">
                        <CardHeader className='py-1 m-0 navbar'>
                            <b>Набор сотрудников для проекта</b>
                        </CardHeader>
                        <CardBody className="m-0 text-start">
                            <LookupSelector label="Выберите проект"
                                            lookupObjectId={selectedProjectId}
                                            findFunction={accessServerAPI.lookup.projectList}
                                            loadFunction={accessServerAPI.lookup.project}
                                            onChange={this.onChangeProjectId}
                            />
                            <InputWithLabel label="Дата набора:" id="projectDate" value={dateToISOStr(selectedProjectDate)}
                                            type="date" onChange={this.onChangeProjectDate}/>
                            <ErrorPanel error={this.state.findErrorMessage}/>
                            <div className="text-end mt-2">
                                    <Button className="ms-1" size="sm" color="primary" outline
                                            onClick={this.onFindClick}>
                                        Поиск сотрудников для свободных вакансий проекта
                                    </Button>
                            </div>

                        </CardBody>
                    </Card>
                    {efficiencyTablePresentation}
                    {employeeWorkplaceListPresentation}
                </Container>
            </div>
        );
    }

}

export default RecruitmentForWorkplace;