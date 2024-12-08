import React, {Component} from "react";
import accessServerAPI from "../model/AccessServerAPI";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import {CloseButton, ErrorPanel, InputWithLabel, SaveButton} from "./CustomControls";
import {useNavigate} from "react-router-dom";
import {LookupSelector} from "./LookupSelector";
import {EmployeePositionFeature} from "../model/EmployeePositionFeature.model";

export type ButtonType = "save" | "apply" | "cancel" | "close";

export interface IEmployeePositionFeatureEditorProps {

    featureId: number;
    title: string;
    buttons: ButtonType[];
    navigate?: ReturnType<typeof useNavigate>;
    childContent?: JSX.Element;
}

interface IEmployeePositionFeatureEditorState {

    feature: EmployeePositionFeature;
    dataChanged: boolean;
    errorMessage: string;
}

export class EmployeePositionFeatureEditor extends Component<IEmployeePositionFeatureEditorProps, IEmployeePositionFeatureEditorState> {
    constructor(props: IEmployeePositionFeatureEditorProps) {
        super(props);
        this.state = {
            feature: new EmployeePositionFeature(),
            dataChanged: false,
            errorMessage: ""
        };
        this.reloadEmployeePositionFeatureFromServer = this.reloadEmployeePositionFeatureFromServer.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.validateData = this.validateData.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChangePositionId = this.onChangePositionId.bind(this);
    }

    componentDidMount() {
        this.reloadEmployeePositionFeatureFromServer();
    }
    componentDidUpdate(prevProps: IEmployeePositionFeatureEditorProps, prevState: IEmployeePositionFeatureEditorState){
        if (prevProps.featureId !== this.props.featureId){
            this.reloadEmployeePositionFeatureFromServer();
        }
    }

    reloadEmployeePositionFeatureFromServer(){
        const featureId = this.props.featureId;
        if (featureId > 0) {
            // @ts-ignore
            accessServerAPI.features.details(featureId)
                .then(
                    foundEmployeePositionFeature => this.setState({...this.state,
                        feature: foundEmployeePositionFeature,
                        dataChanged: false,
                        errorMessage: ""})
                )
        }
    }

    onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        let feature = this.state.feature;
        feature.name = event.target.value;
        this.setState({...this.state, feature, dataChanged: true});
    }

    onChangePositionId(newId: number){
        let feature = this.state.feature;
        if (newId > 0) {
            feature.employeePositionId = newId;
        } else {
            feature.employeePositionId = undefined;
        }
        this.setState({...this.state, feature, dataChanged: true});

    }
    validateData(){
        let errorMessage = "";
        const {feature } = this.state;

        if (feature.name === ""){
            errorMessage = "Заполните 'Название'"
        } /*else if  (feature.employeePositionId<= 0)
        {
            errorMessage = "Заполните поле 'Профессия'"
        }*/

        this.setState({...this.state, errorMessage});

        return errorMessage === "";
    }

    onSave(returnToList: boolean) {
        if(! this.validateData()){
            return;
        }

        const {feature } = this.state;

        let promisedSave = (feature.id) ? (
            accessServerAPI.features.update(feature)
        ) : (
            accessServerAPI.features.create(feature)
        );

        promisedSave.then(savedEmployeePositionFeature => {
            this.setState({...this.state, feature: savedEmployeePositionFeature, dataChanged: false});
            if (returnToList && this.props.navigate) {
                this.props.navigate('/employee_position_feature');
            }
        })
    }

    onCancel(){
      this.reloadEmployeePositionFeatureFromServer();
    }

    render() {
        const feature  = this.state.feature;

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

                            <LookupSelector label="Профессия"
                                            lookupObjectId={(feature.employeePositionId !== undefined)?(feature.employeePositionId!):(0)}
                                            findFunction={accessServerAPI.lookup.positionList}
                                            loadFunction={accessServerAPI.lookup.position}
                                            onChange={this.onChangePositionId}
                                /*enabled={user.id <= 0}*/  />
                            <InputWithLabel label="Название характеристики" id="name" value={feature.name} onChange={this.onChangeName}/>
                            <ErrorPanel error={this.state.errorMessage}/>
                            <FormGroup className="text-end">
                                {buttons.includes("save") && <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />}
                                {buttons.includes("apply") && <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />}
                                {buttons.includes("cancel") && <SaveButton onClick={() => this.onCancel()} enabled={this.state.dataChanged} caption="Отменить" color="danger"/>}
                                {buttons.includes("close") && <CloseButton to="/employee_position_feature" dataChanged={this.state.dataChanged} />}
                            </FormGroup>
                        </Form>
                    </CardBody>
                    {this.props.childContent}
                </Card>
            </Container>
        )
    }



}
