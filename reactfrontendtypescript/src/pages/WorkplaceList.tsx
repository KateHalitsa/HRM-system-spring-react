import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import {Workplace} from "../model/workplace.model";
import accessServerAPI from "../model/AccessServerAPI";

interface WorkplaceListState {
    workplaces: Workplace[];
}

class WorkplaceList extends Component<{}, WorkplaceListState> {

    constructor(props: {}) {
        super(props);
        this.state = { workplaces: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.workplaces.list().then(
            foundWorkplaces => this.setState({ workplaces: foundWorkplaces })
        )
    }

    async remove(id: number) {
        accessServerAPI.workplaces.delete(id).then(() => {
            const updatedWorkplaces: Workplace[] = [...this.state.workplaces].filter(i => i.id !== id);
            this.setState({ workplaces: updatedWorkplaces });
        });
    }

    render() {
        const { workplaces } = this.state;

        const workplaceList: ReactNode = workplaces.map(workplace => {
            return (
                <tr key={workplace.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{workplace.name}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link} to={"/workplace/" + workplace.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline onClick={() => this.remove(workplace.id)} className="py-0">Удалить</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Должности</h5>
                    <Table striped hover size="sm">
                        <thead>
                        <tr>
                            <th>Название</th>

                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/workplace/new" className="py-0">
                                    Добавить должность
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {workplaceList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default WorkplaceList;