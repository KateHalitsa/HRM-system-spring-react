import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import {User} from "../model/user.model";
import accessServerAPI from "../model/AccessServerAPI";

interface UserListState {
    users: User[];
}

class UserList extends Component<{}, UserListState> {

    constructor(props: {}) {
        super(props);
        this.state = { users: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.users.list().then(
            foundUsers => this.setState({ users: foundUsers })
        )
    }

    async remove(id: number) {
        accessServerAPI.users.delete(id).then(() => {
            const updatedUsers: User[] = [...this.state.users].filter(i => i.id !== id);
            this.setState({ users: updatedUsers });
        });
    }

    render() {
        const { users } = this.state;

        const userList: ReactNode = users.map(user => {
            return (
                <tr key={user.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{user.login}</td>
                    <td>{user.email}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link} to={"/users/" + user.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline onClick={() => this.remove(user.id)} className="py-0">Удалить</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Пользователи</h5>
                    <Table striped hover size="sm">
                        <thead>
                        <tr>
                            <th>Логин</th>
                            <th>Адрес почты</th>
                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/users/new" className="py-0">
                                    Добавить пользователя
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default UserList;