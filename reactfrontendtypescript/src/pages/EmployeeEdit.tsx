import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Container} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {EmployeeFeatures} from "../components/EmployeeFeatures";
import {EmployeeEditor} from "../components/EmployeeEditor";

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
                                     navigate = {navigate}
                                     childContent={featurePanel}
                    />
                </Container>
            </div>
        );
    }
}

export default withRouter(EmployeeEdit);