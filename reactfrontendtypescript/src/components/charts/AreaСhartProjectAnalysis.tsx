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
    Legend, BarElement,
} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';
import { FC } from 'react';
import faker from '@faker-js/faker';
import {lineChartData} from "./FAKE_DATA";
import {LookupItem} from "../../model/LookupItem.model";
import {WorkplaceStatistic} from "../../model/WorkplaceStatistic";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
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
export interface IAreaChartAnalysisProps {
    labels: string[];
    values: number[];
}
interface IAnalysisState {

}




const AreaChartProjectAnalysis: FC<IAreaChartAnalysisProps> = ({ labels, values })=> {
    // Установка одинакового цвета для всех столбцов, кроме второго
    const backgroundColors = values.map((_, index) => {
        return index === 1 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'; // Второй столбец красный
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Мои данные',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
               backgroundColor:backgroundColors, //'rgba(75, 192, 192, 0.2)',
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
                text: 'Статистика по проектам',
            },
        },
    };

    return <Bar  options={options} data={data} width={3} height={1} />;
}
export default AreaChartProjectAnalysis