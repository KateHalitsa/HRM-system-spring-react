import React, {Component, RefObject} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Container} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {WorkplaceEditor} from "../components/WorkplaceEditor";
import {UserRoles} from "../components/UserRoles";
import {WorkplaceFeatures} from "../components/WorkplaceFeatures";

interface IWorkplaceEditProps extends WithRouterProps {}
interface IWorkplaceEditState {}
class WorkplaceEdit extends Component<IWorkplaceEditProps, IWorkplaceEditState> {
    render(){

        let workplaceId: number = 0;
        const idStr: string = this.props.params.id;
        if (idStr !== 'new'){ workplaceId = parseInt(idStr) }

        const title = workplaceId ? 'Редактировать должность' : 'Добавить должность';
        const featurePanel = <WorkplaceFeatures workplaceId={workplaceId}/>;

        const navigate = this.props.navigate;

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <WorkplaceEditor workplaceId={workplaceId} title={title}
                            buttons={["save", "apply", "close"]}
                            navigate = {navigate}
                            childContent={featurePanel}
                />
            </Container>
        </div>
        );
    }
}

export default withRouter(WorkplaceEdit);