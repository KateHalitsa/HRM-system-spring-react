import React, {Component, ReactNode} from 'react';
import '../App.css';
import AppNavbar from '../components/AppNavbar';
import { Container } from 'reactstrap';
import PodborPersonala from '../images/podbor-personala.jpg';
import AreaChart from "../components/charts/Area-chart";
import accessServerAPI from "../model/AccessServerAPI";
import PieChart from "../components/charts/PieChart";
import AreaChartProjectAnalysis from "../components/charts/AreaСhartProjectAnalysis";
interface IAnalysisState {
    labels: string[];
    values: number[];
    projectsLabels: string[];
    projectsValues: number[];
}
class Analysis extends Component<{},IAnalysisState>{
    state: IAnalysisState = {
        labels: [],
        values: [],
        projectsLabels: [],
        projectsValues: [],
    };
    componentDidMount() {
      accessServerAPI.analysis.list().then(data => {
            const labels = data.map(item => item.positionName); // Названия для оси X
            const values = data.map(item => item.workplaceCount); // Значения для оси Y

            this.setState({ labels, values });
        }).catch(error => {
            console.error("Ошибка при загрузке данных:", error);
        });
        accessServerAPI.projects_analysis.list().then(data => {

            const projectsLabels= data.map(item => item.projectName);
            const projectsValues= data.map(item => item.totalEffectiveness);
            this.setState({ projectsLabels, projectsValues });
        }).catch(error => {
            console.error("Ошибка при загрузке данных:", error);
        });
    }
    render(): ReactNode {
        const { labels, values,projectsValues,projectsLabels } = this.state;
        return (
            <div>
                <AppNavbar />
                <Container fluid className="align-content-center mt-2 text-center">
                    <h2>Графики</h2>

                        <AreaChart labels={labels} values={values} />
                    <AreaChartProjectAnalysis labels={projectsLabels} values={projectsValues} />
                    <h2>Круговая диаграмма</h2>
                    {labels.length > 0 && values.length > 0 ? (
                        <PieChart  labels={labels} values={values}  />
                    ) : (
                        <p>Загрузка данных...</p>
                    )}

                </Container>
            </div>
        );
    }
}

export default Analysis;

