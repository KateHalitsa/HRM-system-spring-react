import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartProps {
    labels: string[];
    values: number[];
}

const PieChart: React.FC<IPieChartProps> = ({ labels, values }) => {
    const getRandomColors = (num: number): string[] => {
        const colors: string[] = [];
        for (let i = 0; i < num; i++) {
            colors.push(`hsl(${Math.random() * 360}, 100%, 50%)`);
        }
        return colors;
    };

    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: getRandomColors(labels.length), // Генерация цветов
                borderWidth: 1,
            },
        ],
    };
const options={};
    return <Pie options={options} data={data} width={400} height={400}/>;
};

export default PieChart;