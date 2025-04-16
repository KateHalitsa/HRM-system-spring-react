import React, {Component} from 'react';
import {withRouter, WithRouterProps} from "../PrivateRouteUtils/RouterUtils";
import {Button, Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import accessServerAPI from "../model/AccessServerAPI";
import {CloseButton, InputWithLabel, SaveButton} from "../components/CustomControls";
import {Project} from "../model/Project.model";
/*import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';*/
import DatePicker from '@n3/react-date-picker';
import '@n3/react-date-picker/dist/n3-date-picker.css';
import { parseISO } from 'date-fns';
import parseDate from "@n3/react-date-picker/ts/defaults/parseDate";
import {ProjectProgressEditor} from "../components/ProjectProgressEditor";
import {ProjectProgress} from "../model/ProjectProgress";
interface ProjectEditProps extends WithRouterProps {}

interface ProjectEditState {
    project: Project;
    dataChanged: boolean;
    calculatedProgress:  ProjectProgress[];
}

class ProjectEdit extends Component<ProjectEditProps, ProjectEditState> {

    constructor(props: ProjectEditProps) {
        super(props);
        this.state = {
            project: new Project(),
            dataChanged: false,
            calculatedProgress: []
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeFinishDate = this.onChangeFinishDate.bind(this);
        this.onSave = this.onSave.bind(this);
        this.calculateProgress = this.calculateProgress.bind(this);
    }

    async componentDidMount() {
        const id: string = this.props.params.id;
        if (id !== 'new') {
           const project = await accessServerAPI.projects.details(parseInt(id));
            // Преобразуйте строки дат в объекты Date

            if (typeof project.dateStart === 'string') {
                project.dateStart = parseISO(project.dateStart);
            }
            if (typeof project.dateFinish === 'string') {
                project.dateFinish = parseISO(project.dateFinish);
            }
           this.setState({...this.state, project});
        }
    }

    onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        let project = this.state.project;
        project.name = event.target.value;
        this.setState({...this.state, project, dataChanged: true});
    }
    onChangeStartDate(date: Date | null) {
        //let project = this.state.project;
        this.state.project.dateStart = date;
        this.setState({ ...this.state, dataChanged: true });
    }

    onChangeFinishDate(date: Date | null) {
        //let project = this.state.project;
        this.state.project.dateFinish = date;
        this.setState({ ...this.state, dataChanged: true });
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
    calculateProgress() {
        const { dateStart, dateFinish } = this.state.project;

        if (dateStart && dateFinish) {
            const startDate = new Date(dateStart);
            const endDate = new Date(dateFinish);
            const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
            const plannedPercentage = totalMonths > 0 ? 100 / totalMonths : 0;

            const progressList: ProjectProgress[] = [];
            for (let i = 1; i <= totalMonths; i++) {
                const monthDate = new Date(startDate);
                monthDate.setMonth(startDate.getMonth() + i);
                monthDate.setHours(3, 0, 0, 0);
                const progress = new ProjectProgress();
               // progress.id = i + 1; // или используйте уникальный id
               //progress.date = new Date(`${monthDate.getDate()}-${monthDate.getMonth()+1}-${monthDate.getFullYear()}`); // Преобразуем в "YYYY-MM-DD"
                progress.id = -(Date.now() + i); // Generate a temporary unique ID
                progress.date = monthDate; // начальное значение для даты
               // progress.date = new Date(monthDate.getFullYear(), monthDate.getMonth(), monthDate.getDate()); // Корректное создание даты
                progress.projectId = this.state.project.id; // используйте id проекта
                progress.planned_percentage = plannedPercentage;
                progress.execution_percentage = 0; // фактический процент на момент расчета

                progressList.push(progress);
            }

            this.setState({ calculatedProgress: progressList });
        }
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

                            {/* Выбор даты начала */}
                            <FormGroup>
                                <label>Дата начала</label>
                                <DatePicker
                                    value={ project.dateStart}
                                    onChange={this.onChangeStartDate}

                                />
                            </FormGroup>

                            {/* Выбор даты окончания */}
                            <FormGroup>
                                <label>Дата окончания</label>
                                <DatePicker
                                    value={project.dateFinish}
                                    onChange={this.onChangeFinishDate}
                                    clear={true}
                                    //locale="ru"
                                />
                            </FormGroup>
                            <FormGroup className="text-end">
                                <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />
                                <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />
                                <Button onClick={this.calculateProgress} >Рассчитать прогресс</Button>
                                <CloseButton to="/project" dataChanged={this.state.dataChanged}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <ProjectProgressEditor projectId={project.id} calculatedProgress={this.state.calculatedProgress}/>
                </Card>
            </Container>
        </div>)
    }
}

export default withRouter(ProjectEdit);