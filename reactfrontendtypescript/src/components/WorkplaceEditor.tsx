import React, {Component} from "react";
import accessServerAPI from "../model/AccessServerAPI";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import {CloseButton, ErrorPanel, InputWithLabel, SaveButton} from "./CustomControls";
import {useNavigate} from "react-router-dom";
import {MyComponentPosition} from "./LookupSelector";
import {Workplace} from "../model/workplace.model";


export type ButtonType = "save" | "apply" | "cancel" | "close";

export interface IWorkplaceEditorProps {
    workplaceId: number;
    title: string;
    buttons: ButtonType[];
    navigate?: ReturnType<typeof useNavigate>;
    childContent?: JSX.Element;
}

interface IWorkplaceEditorState {
    workplace: Workplace;
    dataChanged: boolean;
    name: string;
    errorMessage: string;
}

export class WorkplaceEditor extends Component<IWorkplaceEditorProps, IWorkplaceEditorState> {
    constructor(props: IWorkplaceEditorProps) {
        super(props);
        this.state = {
            workplace: new Workplace(),
            dataChanged: false,
            name: "",

            errorMessage: ""
        };
        this.reloadWorkplaceFromServer = this.reloadWorkplaceFromServer.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.validateData = this.validateData.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.reloadWorkplaceFromServer();
    }
    componentDidUpdate(prevProps: IWorkplaceEditorProps, prevState: IWorkplaceEditorState){
        if (prevProps.workplaceId !== this.props.workplaceId){
            this.reloadWorkplaceFromServer();
        }
    }

    reloadWorkplaceFromServer(){
        const workplaceId = this.props.workplaceId;
        if (workplaceId > 0) {
            // @ts-ignore
            accessServerAPI.workplaces.details(workplaceId)
                .then(
                    foundWorkplace => this.setState({...this.state,
                        workplace: foundWorkplace,
                        dataChanged: false,
                        name: "",

                        errorMessage: ""})
                )
        }
    }

    onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        let workplace = this.state.workplace;
        workplace.name = event.target.value;
        this.setState({...this.state, workplace, dataChanged: true});
    }
    onChangePosition(event: React.ChangeEvent<HTMLInputElement>) {
        let workplace = this.state.workplace;
        workplace.employeePositionId = parseInt(event.target.value);
        this.setState({...this.state, workplace, dataChanged: true});
    }



    validateData(){
        let errorMessage = "";
        const {workplace, name} = this.state;

        if (workplace.name === ""){
            errorMessage = "Заполните 'Название'"
        }

        this.setState({...this.state, errorMessage});

        return errorMessage === "";
    }

    onSave(returnToList: boolean) {
        if(! this.validateData()){
            return;
        }

        const {workplace, name} = this.state;



        let promisedSave = (workplace.id) ? (
            accessServerAPI.workplaces.update(workplace)
        ) : (
            accessServerAPI.workplaces.create(workplace)
        );

        promisedSave.then(savedWorkplace => {
            this.setState({...this.state, workplace: savedWorkplace, dataChanged: false, name: ""});
            if (returnToList && this.props.navigate) {
                this.props.navigate('/workplace');
            }
        })
    }

    onCancel(){
      this.reloadWorkplaceFromServer();
    }

    render() {
        const workplace  = this.state.workplace;
        const passwordPlaceholder = workplace.id ? 'для изменения пароля введите новый пароль' : '';

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
                            <MyComponentPosition/>
                            <InputWithLabel label="Название" id="name" value={workplace.name} onChange={this.onChangeName}/>
                            <InputWithLabel label="Профессия" id="employee_position_id" value={String(workplace.employeePositionId)} onChange={this.onChangePosition}/>
                            <ErrorPanel error={this.state.errorMessage}/>
                            <FormGroup className="text-end">
                                {buttons.includes("save") && <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />}
                                {buttons.includes("apply") && <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />}
                                {buttons.includes("cancel") && <SaveButton onClick={() => this.onCancel()} enabled={this.state.dataChanged} caption="Отменить" color="danger"/>}
                                {buttons.includes("close") && <CloseButton to="/workplace" dataChanged={this.state.dataChanged} />}
                            </FormGroup>
                        </Form>
                    </CardBody>
                    {this.props.childContent}
                </Card>
            </Container>
        )
    }



}
