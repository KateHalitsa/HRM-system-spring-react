import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import accessServerAPI from "../model/AccessServerAPI";
import {CloseButton, InputWithLabel, SaveButton} from "../components/CustomControls";
import {Project} from "../model/Project.model";

interface ProjectEditProps extends WithRouterProps {}

interface ProjectEditState {
    project: Project;
    dataChanged: boolean
}

class ProjectEdit extends Component<ProjectEditProps, ProjectEditState> {

    constructor(props: ProjectEditProps) {
        super(props);
        this.state = {
            project: new Project(),
            dataChanged: false
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount() {
        const id: string = this.props.params.id;
        if (id !== 'new') {
           const project = await accessServerAPI.projects.details(parseInt(id));
           this.setState({...this.state, project});
        }
    }

    onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        let project = this.state.project;
        project.name = event.target.value;
        this.setState({...this.state, project, dataChanged: true});
    }


    onSave(returnToList: boolean) {
        const project = this.state.project;

       let promisedSave = (project.id) ? (
            accessServerAPI.projects.update(project)
        ) : (
            accessServerAPI.projects.create(project)
        );

        promisedSave.then(savedProject => {
            this.setState({...this.state, project: savedProject, dataChanged: false});
            if (returnToList) {
                this.props.navigate('/project');
            }
        })
    }

    render() {
        const project  = this.state.project;
        const title = <div>{project.id ? 'Редактировать проект' : 'Добавить проект'}</div>;

        return (
        <div>
            <AppNavbar />
            <Container className="mt-1">
                <Card color="light"  className="mt-2 p-0">
                    <CardHeader className='py-1'>{title}</CardHeader>
                    <CardBody className="m-0 pb-0">
                        <Form>
                            <InputWithLabel label="Название" id="name" value={project.name} onChange={this.onChangeName}/>

                            <FormGroup className="text-end">
                                <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />
                                <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />
                                <CloseButton to="/project" dataChanged={this.state.dataChanged}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>)
    }
}

export default withRouter(ProjectEdit);