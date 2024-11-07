import React, {Component, MouseEventHandler, ReactNode} from 'react';
import '../App.css';
import {Button, Card, CardBody, CardHeader, Container, Input, Label} from 'reactstrap';
import {RoleForUser} from "../model/RoleForUser.model";
import accessServerAPI from "../model/AccessServerAPI";
import {SaveButton} from "./CustomControls";

interface IUserRolesProps  {
    userId: number;
}

interface IUserListState {
    roles: RoleForUser[];
    rolesChanged: boolean
}

export class UserRoles extends Component<IUserRolesProps, IUserListState> {

    constructor(props: IUserRolesProps) {
        super(props);
        this.state = { roles: [], rolesChanged: false};


        this.loadRoles = this.loadRoles.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.saveRoles = this.saveRoles.bind(this);
    }

    componentDidMount() {
        this.loadRoles(this.props.userId);
    }

    loadRoles(userId: number){
        if (userId > 0){
            accessServerAPI.users.roles(userId).then(
                foundRoles => this.setState({...this.state, roles: foundRoles })
            )
        }
    }
    componentDidUpdate(prevProps: IUserRolesProps, prevState: IUserListState){
        if (prevProps.userId !== this.props.userId){
            this.loadRoles(this.props.userId);
        }
    }

    onChecked(roleId: number){
        const { roles } = this.state;
        let role = roles.find((element) => element.roleId === roleId);
        if (role) {
            role!.isSelected = !role!.isSelected;
            this.setState({...this.state, roles: roles, rolesChanged: true});
        }
    }

    saveRoles(){
        accessServerAPI.users.updateRoles(this.props.userId, this.state.roles)
            .then(foundRoles => {
                this.setState({...this.state, roles: foundRoles, rolesChanged: false});
            }
        );
    }

    render() {
        const userId = this.props.userId;
        if (userId <= 0){
            return <></>;
        }

        const { roles } = this.state;

        const roleList: ReactNode = roles.map(role => {
            return (
                <div className="form-check ms-4">
                  <Input className="form-check-input" type="checkbox"  id={"name_" + role.roleId}
                         checked={role.isSelected} onChange={() => this.onChecked(role.roleId)} />
                  <Label className="form-check-label" for={"name_" + role.roleId}>
                    {role.roleName}
                  </Label>
                </div>
            );
        });

        return (
        <Card color="light" className="m-3 mt-0">
            <CardHeader className='py-1 m-0 navbar' >
                <div className="me-auto">Роли доступные пользователю:</div>
               <SaveButton onClick={() => this.saveRoles()} enabled={this.state.rolesChanged} />
            </CardHeader>
            <CardBody className="m-0 text-start">
                {roleList}
            </CardBody>
        </Card>
        );

    }
}