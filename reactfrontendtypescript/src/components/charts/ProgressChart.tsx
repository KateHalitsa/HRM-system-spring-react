import React, {Component} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FC } from 'react';
import faker from '@faker-js/faker';
import {lineChartData} from "./FAKE_DATA";
import {LookupItem} from "../../model/LookupItem.model";
import {WorkplaceStatistic} from "../../model/WorkplaceStatistic";
import {ProjectProgress} from "../../model/ProjectProgress";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
export interface IAreaChartProps {
    progressData: ProjectProgress[];
}
interface IAnalysisState {

}


const ProgressChart: FC<IAreaChartProps> = ({progressData  })=> {
    const labels = progressData.map(item => item.date ? item.date.toISOString().split('T')[0] : '');
    const plannedData = progressData.map(item => item.planned_percentage);
    const executionData = progressData.map(item => item.execution_percentage);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Планируемый прогресс',
                data: plannedData,
                borderColor: 'rgba(75, 192, 192, 1)',
               // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                //fill: true,
            },
            {
                label: 'Фактический прогресс',
                data: executionData,
                borderColor: 'rgba(255, 99, 132, 1)',
                //backgroundColor: 'rgba(255, 99, 132, 0.2)',
                //fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Прогресс проекта',
            },
        },
    };

    return <Line options={options} data={data} width={3} height={1} />;
}
export default ProgressChart