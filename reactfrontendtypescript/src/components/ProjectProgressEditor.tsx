import React, {Component, ReactNode} from 'react';
import '../App.css';
import {Card, CardBody, CardHeader, Input, Label, Table} from 'reactstrap';

import accessServerAPI from "../model/AccessServerAPI";
import {SaveButton} from "./CustomControls";
import {ProjectProgress} from "../model/ProjectProgress";
import parseDate from "@n3/react-date-picker/ts/defaults/parseDate";
import DatePicker from "@n3/react-date-picker";
import ProgressChart from "./charts/ProgressChart";

interface IProjectProgressProps  {
    projectId: number;
    calculatedProgress:  ProjectProgress[];
}

interface IProjectListState {
    progress: ProjectProgress[];
    progressChanged: boolean
}

export class ProjectProgressEditor extends Component<IProjectProgressProps, IProjectListState> {

    constructor(props: IProjectProgressProps) {
        super(props);
        this.state = { progress: [], progressChanged: false};


        this.loadProgress = this.loadProgress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveProgress = this.saveProgress.bind(this);

    }

    componentDidMount() {
        this.loadProgress(this.props.projectId);
    }

    loadProgress(projectId: number){
       /* if (projectId > 0) {
            accessServerAPI.projectProgress.details(projectId).then(foundProgress => {
                this.setState({ progress: foundProgress });
            });
        }*/if (projectId > 0) {
            accessServerAPI.projectProgress.details(projectId).then(foundProgress => {
                // Преобразуйте строки в даты при загрузке данных
                const updatedProgress = foundProgress.map(item => ({
                    ...item,
                    date: item.date ? new Date(item.date) : null, // Преобразуйте строку в Date
                }));
                this.setState({ progress: updatedProgress });
            }
            /* if (projectId > 0) {
            accessServerAPI.projectProgress.details(projectId).then(foundProgress => {
                const updatedProgress = foundProgress.map(item => {
                    const date = item.date ? new Date(item.date) : null;
                    // Корректировка для часового пояса
                    if (date) {
                        date.setHours(date.getHours() + date.getTimezoneOffset()/ 60);
                    }
                    return {
                        ...item,
                        date: date, // Преобразуем строку в Date с учетом часового пояса
                    };
                });
                this.setState({ progress: updatedProgress });
            }
            */);
        }
    }
    componentDidUpdate(prevProps: IProjectProgressProps, prevState: IProjectListState){
        /*  this.loadProgress(this.props.projectId);*/
      if (prevProps.projectId !== this.props.projectId){
        this.loadProgress(this.props.projectId);
    }
        if (prevProps.calculatedProgress !== this.props.calculatedProgress) {
            // Создаем массив объектов ProjectProgress из calculatedProgress
            const newProgress: ProjectProgress[] = this.props.calculatedProgress.map((item, index) => {
                const progress = new ProjectProgress();
                progress.id=item.id// или присвойте уникальный id
                progress.date = item.date; // начальное значение для даты
                progress.projectId = item.projectId;
                progress.planned_percentage = item.planned_percentage;
                progress.execution_percentage = item.execution_percentage;
                return progress;
            });

            this.setState({ progress: newProgress,progressChanged: true });
        }

    }

    onChange(e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) {
        const valueStr = e.target.value.trim();
        let value: Date | null = null;

        if (field === 'date' && valueStr) {
            value = new Date(valueStr);
            if (isNaN(value.getTime())) {
                value = null; // Устанавливаем null, если дата не валидна
            }
        }

        const { progress } = this.state;
        /*const projectProgress = progress.find(element => element.projectId === projectId);

        if (projectProgress) {
            if (field === 'date') {
                projectProgress.date = value; // Теперь value - это Date | null
            } else if (field === 'planned_percentage') {
                projectProgress.planned_percentage = isNaN(parseFloat(valueStr)) ? 0 : parseFloat(valueStr);
            } else if (field === 'execution_percentage') {
                projectProgress.execution_percentage = isNaN(parseFloat(valueStr)) ? 0 : parseFloat(valueStr);
            }
            else if (field === 'project_id') {
                projectProgress.projectId = projectId;
            }

            this.setState({ progress, progressChanged: true });
        } const updatedProgress = progress.map((projectProgress) => {
            if (projectProgress.id === id) {
                // Создаем новый объект с обновленными значениями
                return {
                    ...projectProgress, // Копируем старые значения
                    id:field ==='id'? projectProgress.id : 0,
                    date: field === 'date' ? value : projectProgress.date,
                    planned_percentage: field === 'planned_percentage' ? (isNaN(parseFloat(valueStr)) ? 0 : parseFloat(valueStr)) : projectProgress.planned_percentage,
                    execution_percentage: field === 'execution_percentage' ? (isNaN(parseFloat(valueStr)) ? 0 : parseFloat(valueStr)) : projectProgress.execution_percentage,
                };
            }
            return projectProgress;
            //return projectProgress; // Возвращаем неизмененный объект
            this.setState({ progress:progress, progressChanged: true }); }
            */
        // Обновление массива прогресса
        const updatedProgress = progress.map((projectProgress) => {
            if (projectProgress.id === id) {
                return {
                    ...projectProgress, // Копируем старые значения
                    date: field === 'date' ? value : projectProgress.date,
                    planned_percentage: field === 'planned_percentage' ? (isNaN(parseFloat(valueStr)) ? 0 : parseFloat(valueStr)) : projectProgress.planned_percentage,
                    execution_percentage: field === 'execution_percentage' ? (isNaN(parseFloat(valueStr)) ? 0 : parseFloat(valueStr)) : projectProgress.execution_percentage,
                };
            }
            return projectProgress; // Возвращаем неизмененный объект
        });

        this.setState({ progress: updatedProgress, progressChanged: true }
        );
    }

    saveProgress(){
        const { projectId } = this.props;
const progress=this.state.progress ;

        // Разделяем прогрессы на новые и существующие
        const newProgress = progress.filter(item => item.id < 0); // Предполагаем, что id = 0 означает новый элемент
        const existingProgress = progress.filter(item => item.id > 0); // Существующие элементы
        const newProgressToSave = newProgress.map(item => ({
            ...item,
            id: 0, // Reset ID to 0 for new entries
        }));
        // Сохраняем новые прогрессы
        if (newProgress.length > 0) {
            accessServerAPI.projectProgress.create(newProgressToSave).then((savedNewProgress) => {
                // Обновляем состояние с новыми прогрессами
                this.setState({  progressChanged: false });

                this.loadProgress(this.props.projectId);
            });
        }

        // Обновляем существующие прогрессы
        if (existingProgress.length > 0) {
            accessServerAPI.projectProgress.update(projectId, existingProgress).then((updatedProgressList) => {
                // Обновляем состояние с обновленными прогрессами
                this.setState({  progressChanged: false });
                this.loadProgress(this.props.projectId);
            });
        }
       // this.loadProgress(this.props.projectId);
    }

    render() {
        const projectId = this.props.projectId;
        if (projectId <= 0){
            return <></>;
        }

        const { progress } = this.state;

        let prevProjectPositionName = "Q123XYZ";
        const startNewSection = (positionName: string) => {
            if (positionName !== prevProjectPositionName){
                prevProjectPositionName = positionName;
                let text;
                if (positionName == null){
                    text = <div>"<b>Общие</b>" характеристики:</div>
                }else {
                    text = <div>Характеристики по профессии "<b>{positionName}</b>":</div>
                }

                return (<tr className="table-secondary"><td colSpan={2}>{text}</td></tr>);
            }
            return <></>
        }

        const progressList: ReactNode = progress.map(progress => (
            <tr key={progress.id}>
                <td>
                    <input
                        type="date"
                        value={progress.date instanceof Date ? progress.date.toISOString().substring(0, 10) : ''}
                        onChange={(e) => this.onChange(e, progress.id, 'date')}
                        style={{ width: '110px', padding: '2px' }} />

                </td>
                <td>
                    <input
                        type="number"
                        value={progress.planned_percentage}
                        onChange={(e) => this.onChange(e, progress.id, 'planned_percentage')}
                        style={{ width: '60px', padding: '2px' }}/>
                </td>
                <td>
                    <input
                        type="number"
                        value={progress.execution_percentage}
                        onChange={(e) => this.onChange(e, progress.id, 'execution_percentage')}
                        style={{ width: '60px', padding: '2px' }}/>
                </td>
            </tr>
        ));

        return (
            <Card color="light" className="m-3 mt-0" >
                <CardHeader className='py-1 m-0 navbar'>
                    <div className="me-auto">Прогресс:</div>
                    <SaveButton onClick={this.saveProgress} enabled={this.state.progressChanged} />
                </CardHeader>

                <CardBody className="m-0 text-start" >
                    <div className="d-flex flex-row " >
                        <div className="table-container" style={{ flex:  '0 0 35%',  marginRight: '1rem'}}>
                            <Table hover  size="sm" style={{ width: '100%', tableLayout: 'fixed' }}>
                                <thead >
                                <tr>
                                    <th style={{ width: '33%' }}>Дата</th>
                                    <th style={{ width: '33%' }}>Планируемый процент</th>
                                    <th style={{ width: '33%' }}>Фактический процент</th>
                                </tr>
                                </thead>
                                <tbody >
                                {progressList}
                                </tbody>
                            </Table>
                        </div>
                        <div className="chart-container" style={{ flex: '1',overflow: 'hidden' }}>
                            <div style={{ width: '100%',height: '400px'}}> {/* Добавляем обертку */}
                                <ProgressChart progressData={progress} />
                            </div>
                        </div>
                    </div></CardBody>
            </Card>

        );

    }
}