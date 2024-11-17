import React, {Component, ReactNode} from 'react';
import '../App.css';
import {Button, Card, CardBody, CardHeader, Input, Label, Table} from 'reactstrap';
import {FeatureForEmployee} from "../model/FeatureForEmployee.model";
import accessServerAPI from "../model/AccessServerAPI";
import {SaveButton} from "./CustomControls";
import {Link} from "react-router-dom";

interface IEmployeeFeaturesProps  {
    employeeId: number;
}

interface IEmployeeListState {
    features: FeatureForEmployee[];
    featuresChanged: boolean
}

export class EmployeeFeatures extends Component<IEmployeeFeaturesProps, IEmployeeListState> {

    constructor(props: IEmployeeFeaturesProps) {
        super(props);
        this.state = { features: [], featuresChanged: false};


        this.loadFeatures = this.loadFeatures.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveFeatures = this.saveFeatures.bind(this);
    }

    componentDidMount() {
        this.loadFeatures(this.props.employeeId);
    }

    loadFeatures(employeeId: number){
        if (employeeId > 0){
            accessServerAPI.employees.features(employeeId).then(
                foundFeatures => this.setState({...this.state, features: foundFeatures })
            )
        }
    }
    componentDidUpdate(prevProps: IEmployeeFeaturesProps, prevState: IEmployeeListState){
        if (prevProps.employeeId !== this.props.employeeId){
            this.loadFeatures(this.props.employeeId);
        }
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>){

        let valueStr = e.target.value.trim();
        if (valueStr === ""){
            valueStr = "0";
        }
        const value = parseInt(valueStr);

        e.target.style.fontWeight = "bold";
        if (isNaN(value)) {
            e.target.style.color = "red";
            return;
        }
        e.target.style.color = "green";

        const featureStr = e.target.getAttribute('featureId')!;
        const featureId =  parseInt(featureStr);

        const { features } = this.state;
        let feature = features.find((element) => element.featureId === featureId);
        if (feature) {
            feature.value = value;
            this.setState({...this.state, features: features, featuresChanged: true});
        }
    }

    saveFeatures(){
        accessServerAPI.employees.updateFeatures(this.props.employeeId, this.state.features)
            .then(foundFeatures => {
                this.setState({...this.state, features: foundFeatures, featuresChanged: false});
            }
        );
    }

    render() {
        const employeeId = this.props.employeeId;
        if (employeeId <= 0){
            return <></>;
        }

        const { features } = this.state;

        const featureList: ReactNode = features.map(feature => {
            return (
                    <tr >
                    <td>
                  <Label className="form-check-label" for={"name_" + feature.featureId}>
                    {feature.featureName}
                  </Label>
                    </td>
                    <td>
                    <Input className="form-text-input" type="text"  id={"name_" + feature.featureId}
                           featureId={feature.featureId}
                           value={feature.value}
                           onChange={this.onChange} />
                        </td>
                        </tr >

            );
        });

        return (
        <Card color="light" className="m-3 mt-0">
            <CardHeader className='py-1 m-0 navbar' >
                <div className="me-auto">Характеристики сотрудника:</div>
               <SaveButton onClick={() => this.saveFeatures()} enabled={this.state.featuresChanged} />
            </CardHeader>
            <CardBody className="m-0 text-start">
                <div className="form-check ms-4">
                <Table striped hover size="sm">
                    <thead>
                    <tr>
                        <th >Название</th>
                        <th >Оценка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {featureList}
                    </tbody>

                </Table>
                </div>
            </CardBody>
        </Card>
        );

    }
}