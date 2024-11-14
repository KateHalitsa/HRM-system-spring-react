import React, {Component, ReactNode} from 'react';
import '../App.css';
import {Button, Card, CardBody, CardHeader, Input, Label, Table} from 'reactstrap';
import {FeatureForWorkplace} from "../model/FeatureForWorkplace.model";
import accessServerAPI from "../model/AccessServerAPI";
import {SaveButton} from "./CustomControls";
import {Link} from "react-router-dom";

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
        this.onChecked = this.onChecked.bind(this);
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

    onChecked(featureId: number){
        const { features } = this.state;
        let feature = features.find((element) => element.featureId === featureId);
        if (feature) {
            feature!.isSelected = !feature!.isSelected;

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

        const featureList: ReactNode = features.map(feature => {
            return (
                    <tr >
                    <td>
                  <Label className="form-check-label" for={"name_" + feature.featureId}>
                    {feature.featureName}
                  </Label>
                    </td>
                    <td>
                    <Input className="form-text-input" type="text"  id={"name_" + feature.weight}
                           checked={feature.isSelected} onChange={() => this.onChecked(feature.weight)} />
                        </td>
                        </tr >

            );
        });

        return (
        <Card color="light" className="m-3 mt-0">
            <CardHeader className='py-1 m-0 navbar' >
                <div className="me-auto">Веса характеристик:</div>
               <SaveButton onClick={() => this.saveFeatures()} enabled={this.state.featuresChanged} />
            </CardHeader>
            <CardBody className="m-0 text-start">
                <div className="form-check ms-4">
                <Table striped hover size="sm">
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