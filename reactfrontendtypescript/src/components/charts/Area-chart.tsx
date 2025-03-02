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
    labels: string[];
    values: number[];
}
interface IAnalysisState {

}




const AreaChart: FC<IAreaChartProps> = ({ labels, values })=> {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Мои данные',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
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
                text: 'Статистика по профессиям',
            },
        },
    };

    return <Line options={options} data={data} width={3} height={1} />;
}
export default AreaChart