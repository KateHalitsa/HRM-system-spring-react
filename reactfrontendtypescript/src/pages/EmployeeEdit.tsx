import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {dateToISOStr, Employee} from "../model/employee.model";
import accessServerAPI from "../model/AccessServerAPI";
import {CloseButton, InputWithLabel, SaveButton} from "../components/CustomControls";
import {EmployeeFeatures} from "../components/EmployeeFeatures";
import {EmployeeEditor} from "../components/EmployeeEditor";

/*interface EmployeeEditProps extends WithRouterProps {}

interface EmployeeEditState {
    employee: Employee;
    dataChanged: boolean
}

class EmployeeEdit extends Component<EmployeeEditProps, EmployeeEditState> {

    constructor(props: EmployeeEditProps) {
        super(props);
        this.state = {
            employee: new Employee(),
            dataChanged: false
        };
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount() {
        const id: string = this.props.params.id;
        if (id !== 'new') {
           const employee = await accessServerAPI.employees.details(parseInt(id));
           this.setState({...this.state, employee});
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

    onSave(returnToList: boolean) {
        const employee = this.state.employee;

       let promisedSave = (employee.id) ? (
            accessServerAPI.employees.update(employee)
        ) : (
            accessServerAPI.employees.create(employee)
        );

        promisedSave.then(savedEmployee => {
            this.setState({...this.state, employee: savedEmployee, dataChanged: false});
            if (returnToList) {
                this.props.navigate('/employees');
            }
        })
    }

    render() {
        let employeeId: number = 0;
        const employee  = this.state.employee;
        const title = <div>{employee.id ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</div>;
        const featurePanel = <EmployeeFeatures employeeId={employeeId}/>;
        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <Card color="light"  className="mt-2 p-0">
                    <CardHeader className='py-1'>{title}</CardHeader>
                    <CardBody className="m-0 pb-0">
                        <Form>
                            <InputWithLabel label="Имя" id="firstName" value={employee.firstName} onChange={this.onChangeFirstName}/>
                            <InputWithLabel label="Фамилия" id="lastName" value={employee.lastName} onChange={this.onChangeLastName}/>
                            <InputWithLabel label="Дата рождения" id="birthday" value={dateToISOStr(employee.birthday)}
                                            type="date" onChange={this.onChangeBirthday}/>
                            <FormGroup className="text-end">
                                <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />
                                <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />
                                <CloseButton to="/employees" dataChanged={this.state.dataChanged}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <EmployeeFeatures employeeId={employeeId} />
                </Card>
            </Container>
        </div>)
    }
}

export default withRouter(EmployeeEdit);*/
interface IEmployeeEditProps extends WithRouterProps {}
interface IEmployeeEditState {}
class EmployeeEdit extends Component<IEmployeeEditProps, IEmployeeEditState> {
    render(){

        let employeeId: number = 0;
        const idStr: string = this.props.params.id;
        if (idStr !== 'new'){ employeeId = parseInt(idStr) }

        const title = employeeId ? 'Редактировать пользователя' : 'Добавить пользователя';
        const featurePanel = <EmployeeFeatures employeeId={employeeId}/>;

        const navigate = this.props.navigate;

        return (
            <div>
                <AppNavbar />
                <Container className="mt-1">

                    <EmployeeEditor employeeId={employeeId} title={title}
                                     buttons={["save", "apply", "close"]}
                                     navigate = {navigate}
                                     childContent={featurePanel}
                    />
                </Container>
            </div>
        );
    }
}

export default withRouter(EmployeeEdit);