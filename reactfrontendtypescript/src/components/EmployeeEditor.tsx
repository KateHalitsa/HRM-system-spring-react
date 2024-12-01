import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {Employee} from "../model/employee.model";
import accessServerAPI from "../model/AccessServerAPI";
import {CloseButton, ErrorPanel, InputWithLabel, SaveButton} from "../components/CustomControls";
import {ButtonType, IWorkplaceEditorProps, WorkplaceEditor} from "../components/WorkplaceEditor";
import {useNavigate} from "react-router-dom";
import {dateToISOStr} from "./DateUtils";

interface EmployeeEditProps extends WithRouterProps {}

export interface IEmployeeEditorProps {
    employeeId: number;
    title: string;
    buttons: ButtonType[];
    navigate?: ReturnType<typeof useNavigate>;
    childContent?: JSX.Element;
}

interface IEmployeeEditorState {
    employee: Employee;
    dataChanged: boolean;
    name: string;
    errorMessage: string;
}
export class EmployeeEditor extends Component<IEmployeeEditorProps, IEmployeeEditorState> {

    constructor(props: IEmployeeEditorProps) {
        super(props);
        this.state = {
            employee: new Employee(),
            dataChanged: false,
            name: "",
            errorMessage: ""
        };
        this.reloadEmployeeFromServer = this.reloadEmployeeFromServer.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onSave = this.onSave.bind(this);
        this.validateData = this.validateData.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.reloadEmployeeFromServer();
    }
    componentDidUpdate(prevProps: IEmployeeEditorProps, prevState: IEmployeeEditorState){
        if (prevProps.employeeId !== this.props.employeeId){
            this.reloadEmployeeFromServer();
        }
    }

    reloadEmployeeFromServer(){
        const employeeId = this.props.employeeId;
        if (employeeId > 0) {
            // @ts-ignore
            accessServerAPI.employees.details(employeeId)
                .then(
                    foundWorkplace => this.setState({...this.state,
                        employee: foundWorkplace,
                        dataChanged: false,
                        name: "",

                        errorMessage: ""})
                )
        }
    }


    onChangeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        let employee = this.state.employee;
        employee.firstName = event.target.value;
        this.setState({...this.state, employee, dataChanged: true});
    }

    onChangeLastName(event: React.ChangeEvent<HTMLInputElement>)
    {
        let employee = this.state.employee;
        employee.lastName = event.target.value;
        this.setState({...this.state, employee, dataChanged: true});
    }

    onChangeBirthday(event: React.ChangeEvent<HTMLInputElement>)
    {
        let employee = this.state.employee;

        employee.birthday = event.target.valueAsDate!;
        employee.birthday.setHours(12);

        this.setState({...this.state, employee, dataChanged: true});
    }

    validateData(){
        let errorMessage = "";
        const {employee, name} = this.state;

        if (employee.firstName === ""){
            errorMessage = "Заполните 'Имя'"
        }
        else if (employee.lastName === ""){
            errorMessage = "Заполните 'Фамилия'"
        }
        else if  (employee.birthday== null)
        {
            errorMessage = "Заполните поле 'День рождения'"
        }

        this.setState({...this.state, errorMessage});

        return errorMessage === "";
    }

    onSave(returnToList: boolean) {
        if(! this.validateData()){
            return;
        }

        const {employee, name} = this.state;



        let promisedSave = (employee.id) ? (
            accessServerAPI.employees.update(employee)
        ) : (
            accessServerAPI.employees.create(employee)
        );

        promisedSave.then(savedWorkplace => {
            this.setState({...this.state, employee: savedWorkplace, dataChanged: false, name: ""});
            if (returnToList && this.props.navigate) {
                this.props.navigate('/employees');
            }
        })
    }

    onCancel(){
        this.reloadEmployeeFromServer();
    }

    render() {
        const employee  = this.state.employee;

        let buttons: ButtonType[] = [];
        if (this.props.buttons) {
            buttons = this.props.buttons!;
        }
        return (
        <div>

            <Container className="mt-1">
                <Card color="light"  className="mt-2 p-0">
                    <CardHeader className='py-1'>{this.props.title}</CardHeader>
                    <CardBody className="m-0 pb-0">
                        <Form>
                            <InputWithLabel label="Имя" id="firstName" value={employee.firstName} onChange={this.onChangeFirstName}/>
                            <InputWithLabel label="Фамилия" id="lastName" value={employee.lastName} onChange={this.onChangeLastName}/>
                            <InputWithLabel label="Дата рождения" id="birthday" value={dateToISOStr(employee.birthday)}
                                            type="date" onChange={this.onChangeBirthday}/>
                            <ErrorPanel error={this.state.errorMessage}/>
                            <FormGroup className="text-end">
                                <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />
                                <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />
                                <CloseButton to="/employees" dataChanged={this.state.dataChanged}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    {this.props.childContent}
                    {
                        //<EmployeeFeatures employeeId={employeeId} />
                    }
                </Card>
            </Container>
        </div>)
    }
}

