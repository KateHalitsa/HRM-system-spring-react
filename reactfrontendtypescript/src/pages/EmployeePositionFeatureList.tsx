import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import {EmployeePositionFeature} from "../model/EmployeePositionFeature.model";
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeePosition} from "../model/EmployeePosition.model";

interface EmployeePositionFeatureListState {
    features: EmployeePositionFeature[];
    positions: EmployeePosition[];
}

class EmployeePositionFeatureList extends Component<{}, EmployeePositionFeatureListState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            features: [],
            positions: []
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.positions.list().then(
            positions =>
                this.setState({...this.state, positions })
        )
        accessServerAPI.features.list().then(
            foundEmployeePositionFeatures =>
                this.setState({...this.state, features: foundEmployeePositionFeatures })
        )
    }

    async remove(id: number) {
        accessServerAPI.features.delete(id).then(() => {
            const updatedEmployeePositionFeatures: EmployeePositionFeature[] = [...this.state.features].filter(i => i.id !== id);
            this.setState({ features: updatedEmployeePositionFeatures });
        });
    }

    render() {
        const { features, positions } = this.state;

        let prevEmployeePositionId = -1;
        let prevEmployeePositionName = "Q123XYZ";
        const startNewSection = (positionId?: number) => {

            let posId = 0;
            if(positionId != undefined){
                posId = positionId!;
            }

            if (posId !== prevEmployeePositionId){
                prevEmployeePositionId = posId;

                prevEmployeePositionName = "";
                if (posId > 0) {
                    prevEmployeePositionName = prevEmployeePositionId.toString();
                    if (positions.length > 0) {
                        const foundPosition = positions.find(pos => pos.id === posId);
                        if (foundPosition !== undefined) {
                            prevEmployeePositionName = foundPosition.name;
                        }
                    }
                }

                let text;
                if (prevEmployeePositionId === 0){
                    text = <div>"<b>Общие</b>" характеристики:</div>
                }else {
                    text = <div>Характеристики по профессии "<b>{prevEmployeePositionName}</b>":</div>
                }

                return (<tr className="table-secondary"><td colSpan={2}>{text}</td></tr>);
            }
            return <></>
        }

        const featureList: ReactNode = features.map(feature => {
            return (
                <>
                    {startNewSection(feature.employeePositionId)}
                    <tr key={feature.id}>
                        <td style={{ whiteSpace: 'nowrap' }}><div className="ms-4">{feature.name}</div></td>
                        <td className="text-end">
                            <ButtonGroup>
                                <Button size="sm" color="primary" outline tag={Link} to={"/employee_position_feature/" + feature.id} className="py-0">Редактировать</Button>
                                <Button size="sm" color="danger" outline onClick={() => this.remove(feature.id)} className="py-0">Удалить</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                </>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Характеристики</h5>
                    <Table hover size="sm">
                        <thead>
                        <tr>
                            <th>Название</th>

                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/employee_position_feature/new" className="py-0">
                                    Добавить характеристику
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {featureList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EmployeePositionFeatureList;