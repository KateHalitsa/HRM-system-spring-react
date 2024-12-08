import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Container} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {EmployeePositionFeatureEditor} from "../components/EmployeePositionFeatureEditor";

interface IEmployeePositionFeatureEditProps extends WithRouterProps {}
interface IEmployeePositionFeatureEditState {}
class EmployeePositionFeatureEdit extends Component<IEmployeePositionFeatureEditProps, IEmployeePositionFeatureEditState> {
    render(){

        let featureId: number = 0;
        const idStr: string = this.props.params.id;
        if (idStr !== 'new'){ featureId = parseInt(idStr) }

        const title = featureId ? 'Редактировать характеристику' : 'Добавить характеристику';


        const navigate = this.props.navigate;

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <EmployeePositionFeatureEditor featureId={featureId} title={title}
                            buttons={["save", "apply", "close"]}
                            navigate = {navigate}

                />
            </Container>
        </div>
        );
    }
}

export default withRouter(EmployeePositionFeatureEdit);