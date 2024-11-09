import React, {Component, RefObject} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {dateToISOStr, Employee} from "../model/employee.model";
import accessServerAPI from "../model/AccessServerAPI";
import {CloseButton, InputWithLabel, SaveButton} from "../components/CustomControls";
import {EmployeePosition} from "../model/EmployeePosition.model";

interface EmployeePositionEditProps extends WithRouterProps {}

interface EmployeePositionEditState {
    position: EmployeePosition;
    dataChanged: boolean
}

class EmployeePositionEdit extends Component<EmployeePositionEditProps, EmployeePositionEditState> {

    constructor(props: EmployeePositionEditProps) {
        super(props);
        this.state = {
            position: new EmployeePosition(),
            dataChanged: false
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount() {
        const id: string = this.props.params.id;
        if (id !== 'new') {
           const position = await accessServerAPI.positions.details(parseInt(id));
           this.setState({...this.state, position});
        }
    }

    onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        let position = this.state.position;
        position.name = event.target.value;
        this.setState({...this.state, position, dataChanged: true});
    }


    onSave(returnToList: boolean) {
        const position = this.state.position;

       let promisedSave = (position.id) ? (
            accessServerAPI.positions.update(position)
        ) : (
            accessServerAPI.positions.create(position)
        );

        promisedSave.then(savedEmployeePosition => {
            this.setState({...this.state, position: savedEmployeePosition, dataChanged: false});
            if (returnToList) {
                this.props.navigate('/employee_position');
            }
        })
    }

    render() {
        const position  = this.state.position;
        const title = <div>{position.id ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</div>;

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <Card color="light"  className="mt-2 p-0">
                    <CardHeader className='py-1'>{title}</CardHeader>
                    <CardBody className="m-0 pb-0">
                        <Form>
                            <InputWithLabel label="Название" id="name" value={position.name} onChange={this.onChangeName}/>

                            <FormGroup className="text-end">
                                <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />
                                <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />
                                <CloseButton to="/employee_position" dataChanged={this.state.dataChanged}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>)
    }
}

export default withRouter(EmployeePositionEdit);