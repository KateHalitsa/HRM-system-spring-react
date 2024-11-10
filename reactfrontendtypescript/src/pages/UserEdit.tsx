import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Container} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import {UserRoles} from "../components/UserRoles";
import {UserEditor} from "../components/UserEditor";

interface IUserEditProps extends WithRouterProps {}
interface IUserEditState {}
class UserEdit extends Component<IUserEditProps, IUserEditState> {
    render(){

        let userId: number = 0;
        const idStr: string = this.props.params.id;
        if (idStr !== 'new'){ userId = parseInt(idStr) }

        const title = userId ? 'Редактировать пользователя' : 'Добавить пользователя';
        const rolePanel = <UserRoles userId={userId}/>;

        const navigate = this.props.navigate;

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <UserEditor userId={userId} title={title}
                            buttons={["save", "apply", "close"]}
                            navigate = {navigate}
                            childContent={rolePanel}
                />
            </Container>
        </div>
        );
    }
}

export default withRouter(UserEdit);