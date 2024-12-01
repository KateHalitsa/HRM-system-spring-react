import {EmployeeWorkplace} from "../model/EmployeeWorkplace.model";
import React, {Component} from "react";
import accessServerAPI from "../model/AccessServerAPI";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import {CloseButton, ErrorPanel, InputWithLabel, SaveButton} from "./CustomControls";
import {useNavigate} from "react-router-dom";
import {LookupSelector} from "./LookupSelector";
import {dateToISOStr} from "./DateUtils";


export type ButtonType = "save" | "apply" | "cancel" | "close";

export interface IEmployeeWorkplaceEditorProps {
    employeeWorkplaceId: number;
    title: string;
    buttons: ButtonType[];
    navigate?: ReturnType<typeof useNavigate>;
    childContent?: JSX.Element;
    onSave?: (newId: number) => void;
}

interface IEmployeeWorkplaceEditorState {
    employeeWorkplace: EmployeeWorkplace;
    dataChanged: boolean;
    errorMessage: string;
}

export class EmployeeWorkplaceEditor extends Component<IEmployeeWorkplaceEditorProps, IEmployeeWorkplaceEditorState> {
    constructor(props: IEmployeeWorkplaceEditorProps) {
        super(props);
        this.state = {
            employeeWorkplace: new EmployeeWorkplace(),
            dataChanged: false,
            errorMessage: ""
        };
        this.reloadEmployeeWorkplaceFromServer = this.reloadEmployeeWorkplaceFromServer.bind(this);
        this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
        this.onChangeWorkplaceId = this.onChangeWorkplaceId.bind(this);
        this.onChangeFromDate = this.onChangeFromDate.bind(this);
        this.onChangeToDate = this.onChangeToDate.bind(this);
        this.onChangeApproved = this.onChangeApproved.bind(this);

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.reloadEmployeeWorkplaceFromServer();
    }
    componentDidUpdate(prevProps: IEmployeeWorkplaceEditorProps, prevState: IEmployeeWorkplaceEditorState){
        if (prevProps.employeeWorkplaceId !== this.props.employeeWorkplaceId){
            this.reloadEmployeeWorkplaceFromServer();
        }
    }

    reloadEmployeeWorkplaceFromServer(){
        const employeeWorkplaceId = this.props.employeeWorkplaceId;
        if (employeeWorkplaceId > 0) {
            accessServerAPI.employeeWorkplaces.details(employeeWorkplaceId)
                .then(
                    foundEmployeeWorkplace => this.setState({...this.state,
                        employeeWorkplace: foundEmployeeWorkplace,
                        dataChanged: false,
                        errorMessage: ""})
                )
        }
    }

    onChangeFromDate(event: React.ChangeEvent<HTMLInputElement>)
    {
        let employeeWorkplace = this.state.employeeWorkplace;

        employeeWorkplace.fromDate = event.target.valueAsDate!;
        employeeWorkplace.fromDate.setHours(12);

        this.setState({...this.state, employeeWorkplace, dataChanged: true});
    }

    onChangeToDate(event: React.ChangeEvent<HTMLInputElement>)
    {
        let employeeWorkplace = this.state.employeeWorkplace;

        employeeWorkplace.toDate = event.target.valueAsDate!;
        employeeWorkplace.toDate.setHours(12);

        this.setState({...this.state, employeeWorkplace, dataChanged: true});
    }

    onChangeApproved(event: React.ChangeEvent<HTMLInputElement>){
        let employeeWorkplace = this.state.employeeWorkplace;

        employeeWorkplace.approved = event.target.checked;

        this.setState({...this.state, employeeWorkplace, dataChanged: true});
    }

    validateData(){
        let errorMessage = "";
        const {employeeWorkplace} = this.state;

        if (employeeWorkplace.employeeId <= 0) {
            errorMessage = "Заполните поле 'Сотрудник'"
        } else if (employeeWorkplace.workplaceId <= 0) {
            errorMessage = "Заполните поле 'Рабочее место'"
        } else if (employeeWorkplace.fromDate >= employeeWorkplace.toDate){
            errorMessage = "Дата завершения контракта должна быть больше даты начала контракта";
        }

        this.setState({...this.state, errorMessage});

        return errorMessage === "";
    }

    onSave(returnToList: boolean) {
        if(! this.validateData()){
            return;
        }

        const {employeeWorkplace} = this.state;

        let promisedSave = (employeeWorkplace.id) ? (
            accessServerAPI.employeeWorkplaces.update(employeeWorkplace)
        ) : (
            accessServerAPI.employeeWorkplaces.create(employeeWorkplace)
        );

        promisedSave.then(savedEmployeeWorkplace => {
            this.setState({...this.state, employeeWorkplace: savedEmployeeWorkplace, dataChanged: false});
            if (this.props.onSave !== null){
                this.props.onSave!(savedEmployeeWorkplace.id);
            }
            if (returnToList && this.props.navigate) {
                this.props.navigate('/employee_workplace');
            }
        })
    }

    onCancel(){
      this.reloadEmployeeWorkplaceFromServer();
    }

    onChangeEmployeeId(newId: number){
        let employeeWorkplace = this.state.employeeWorkplace;
        employeeWorkplace.employeeId = newId;
        this.setState({...this.state, employeeWorkplace, dataChanged: true});
    }

    onChangeWorkplaceId(newId: number){
        let employeeWorkplace = this.state.employeeWorkplace;
        employeeWorkplace.workplaceId = newId;
        this.setState({...this.state, employeeWorkplace, dataChanged: true});
    }

    render() {
        const employeeWorkplace  = this.state.employeeWorkplace;
        const passwordPlaceholder = employeeWorkplace.id ? 'для изменения пароля введите новый пароль' : '';

        let buttons: ButtonType[] = [];
        if (this.props.buttons) {
            buttons = this.props.buttons!;
        }

        return (
            <Container className="mx-0 my-0 px-0 py-0">
                <Card color="light"  className="mt-0 p-0">
                    <CardHeader className='py-1'>{this.props.title}</CardHeader>
                    <CardBody className="m-0 pb-0">
                        <Form>
                            <LookupSelector label="Рабочее место"
                                            lookupObjectId={employeeWorkplace.workplaceId}
                                            findFunction={accessServerAPI.lookup.workplaceList}
                                            loadFunction={accessServerAPI.lookup.workplace}
                                            onChange={this.onChangeWorkplaceId}
                                            enabled={employeeWorkplace.id <= 0} />
                            <LookupSelector label="Сотрудник"
                                            lookupObjectId={employeeWorkplace.employeeId}
                                            findFunction={accessServerAPI.lookup.employeeList}
                                            loadFunction={accessServerAPI.lookup.employee}
                                            onChange={this.onChangeEmployeeId}
                                            enabled={employeeWorkplace.id <= 0} />
                            <InputWithLabel label="Начало контракта" id="fromDate" value={dateToISOStr(employeeWorkplace.fromDate)}
                                            type="date" onChange={this.onChangeFromDate}/>
                            <InputWithLabel label="Завершение контракта" id="toDate" value={dateToISOStr(employeeWorkplace.toDate)}
                                            type="date" onChange={this.onChangeToDate}/>
                            <InputWithLabel label="Контракт утвержден" id="approved" checked={employeeWorkplace.approved}
                                            type="checkbox" onChange={this.onChangeApproved}/>
                            <ErrorPanel error={this.state.errorMessage}/>
                            <FormGroup className="text-end">
                                {buttons.includes("save") && <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />}
                                {buttons.includes("apply") && <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />}
                                {buttons.includes("cancel") && <SaveButton onClick={() => this.onCancel()} enabled={this.state.dataChanged} caption="Отменить" color="danger"/>}
                                {buttons.includes("close") && <CloseButton to="/employee_workplace" dataChanged={this.state.dataChanged} />}
                            </FormGroup>
                        </Form>
                    </CardBody>
                    {this.props.childContent}
                </Card>
            </Container>
        )
    }



}
