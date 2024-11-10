import React, {Component, RefObject} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Container} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {WorkplaceEditor} from "../components/WorkplaceEditor";

interface IWorkplaceEditProps extends WithRouterProps {}
interface IWorkplaceEditState {}
class WorkplaceEdit extends Component<IWorkplaceEditProps, IWorkplaceEditState> {
    render(){

        let workplaceId: number = 0;
        const idStr: string = this.props.params.id;
        if (idStr !== 'new'){ workplaceId = parseInt(idStr) }

        const title = workplaceId ? 'Редактировать должность' : 'Добавить должность';


        const navigate = this.props.navigate;

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <WorkplaceEditor workplaceId={workplaceId} title={title}
                            buttons={["save", "apply", "close"]}
                            navigate = {navigate}

                />
            </Container>
        </div>
        );
    }
}

export default withRouter(WorkplaceEdit);