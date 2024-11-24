import React, { Component, ReactNode } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import accessServerAPI from "../model/AccessServerAPI";
import {Project} from "../model/Project.model";

interface ProjectListState {
    projects: Project[];
}

class ProjectList extends Component<{}, ProjectListState> {

    constructor(props: {}) {
        super(props);
        this.state = { projects: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        accessServerAPI.projects.list().then(
            foundProjects => this.setState({ projects: foundProjects })
        )
    }

    async remove(id: number) {
        accessServerAPI.projects.delete(id).then(() => {
            const updatedProjects: Project[] = [...this.state.projects].filter(i => i.id !== id);
            this.setState({ projects: updatedProjects });
        });
    }

    render() {
        const { projects } = this.state;

        const employeePositionsList: ReactNode = projects.map(project => {
            return (
                <tr key={project.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{project.name}</td>
                    <td className="text-end">
                        <ButtonGroup>
                            <Button size="sm" color="primary" outline tag={Link}
                                    to={"/project/" + project.id} className="py-0">Редактировать</Button>
                            <Button size="sm" color="danger" outline
                                    onClick={() => this.remove(project.id)} className="py-0">Удалить</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid className="pt-2">
                    <h5>Проект</h5>
                    <Table striped hover size="sm">
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th className="text-end">
                                <Button size="sm" color="success" outline tag={Link} to="/project/new" className="py-0">
                                    Добавить проекты
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeePositionsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ProjectList;