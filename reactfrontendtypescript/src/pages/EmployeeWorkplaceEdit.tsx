import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Container} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {EmployeeWorkplaceEditor} from "../components/EmployeeWorkplaceEditor";

interface IEmployeeWorkplaceEditProps extends WithRouterProps {}
interface IEmployeeWorkplaceEditState {
    editorEmployeeWorkplaceId: number;
}
class EmployeeWorkplaceEdit extends Component<IEmployeeWorkplaceEditProps, IEmployeeWorkplaceEditState> {

    render(){

        let employeeWorkplaceId: number = 0;
        if (this.state !== null){
            employeeWorkplaceId = this.state.editorEmployeeWorkplaceId;
        }

        if (employeeWorkplaceId <= 0) {
            const idStr: string = this.props.params.id;
            if (idStr !== 'new') {
                employeeWorkplaceId = parseInt(idStr)
                this.setState({editorEmployeeWorkplaceId: employeeWorkplaceId});
            }
        }

        const title = employeeWorkplaceId ? 'Редактировать назначение' : 'Добавить назначение';

        const navigate = this.props.navigate;

        const onSaveEmployeeWorkplace = (newId: number) => {
           let editorEmployeeWorkplaceId = newId;
           this.setState({editorEmployeeWorkplaceId});
        }

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <EmployeeWorkplaceEditor employeeWorkplaceId={employeeWorkplaceId} title={title}
                            buttons={["save", "apply", "close"]}
                            navigate = {navigate}
                            /*childContent={rolePanel}*/
                            onSave={onSaveEmployeeWorkplace}
                />
            </Container>
        </div>
        );
    }
}

export default withRouter(EmployeeWorkplaceEdit);