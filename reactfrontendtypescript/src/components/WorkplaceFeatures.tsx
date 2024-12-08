import React, {Component, ReactNode} from 'react';
import '../App.css';
import {Card, CardBody, CardHeader, Input, Label, Table} from 'reactstrap';
import {FeatureForWorkplace} from "../model/FeatureForWorkplace.model";
import accessServerAPI from "../model/AccessServerAPI";
import {SaveButton} from "./CustomControls";

interface IWorkplaceFeaturesProps  {
    workplaceId: number;
}

interface IWorkplaceListState {
    features: FeatureForWorkplace[];
    featuresChanged: boolean
}

export class WorkplaceFeatures extends Component<IWorkplaceFeaturesProps, IWorkplaceListState> {

    constructor(props: IWorkplaceFeaturesProps) {
        super(props);
        this.state = { features: [], featuresChanged: false};


        this.loadFeatures = this.loadFeatures.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveFeatures = this.saveFeatures.bind(this);
    }

    componentDidMount() {
        this.loadFeatures(this.props.workplaceId);
    }

    loadFeatures(workplaceId: number){
        if (workplaceId > 0){
            accessServerAPI.workplaces.features(workplaceId).then(
                foundFeatures => this.setState({...this.state, features: foundFeatures })
            )
        }
    }
    componentDidUpdate(prevProps: IWorkplaceFeaturesProps, prevState: IWorkplaceListState){
        if (prevProps.workplaceId !== this.props.workplaceId){
            this.loadFeatures(this.props.workplaceId);
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
            feature.weight = value;
            this.setState({...this.state, features: features, featuresChanged: true});
        }
    }

    saveFeatures(){
        accessServerAPI.workplaces.updateFeatures(this.props.workplaceId, this.state.features)
            .then(foundFeatures => {
                this.setState({...this.state, features: foundFeatures, featuresChanged: false});
            }
        );
    }

    render() {
        const workplaceId = this.props.workplaceId;
        if (workplaceId <= 0){
            return <></>;
        }

        const { features } = this.state;

        let prevEmployeePositionName = "Q123XYZ";
        const startNewSection = (positionName: string) => {
           if (positionName !== prevEmployeePositionName){
               prevEmployeePositionName = positionName;
               let text;
               if (positionName == null){
                   text = <div>"<b>Общие</b>" характеристики:</div>
               }else {
                   text = <div>Характеристики по профессии "<b>{positionName}</b>":</div>
               }

               return (<tr className="table-secondary"><td colSpan={2}>{text}</td></tr>);
           }
            return <></>
        }

        const featureList: ReactNode = features.map(feature => {
            return (
                <>
                    {startNewSection(feature.employeePositionName)}
                    <tr>
                        <td >
                            <Label className="form-check-label ms-4 my-1" for={"name_" + feature.featureId}>
                                {feature.featureName}
                            </Label>
                        </td>
                        <td>
                            <Input className="form-text-input" bsSize="sm" type="text"  id={"name_" + feature.featureId}
                                featureId={feature.featureId}
                                value={feature.weight}
                                onChange={this.onChange} />
                        </td>
                    </tr>
                </>
            );
        });

        return (
        <Card color="light" className="m-3 mt-0">
            <CardHeader className='py-1 m-0 navbar' >
                <div className="me-auto">Веса характеристик:</div>
               <SaveButton onClick={() => this.saveFeatures()} enabled={this.state.featuresChanged} />
            </CardHeader>
            <CardBody className="m-0 text-start">
                <div className="px-2">
                <Table hover size="sm">
                    <thead>
                    <tr>
                        <th >Название</th>
                        <th >Вес</th>
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