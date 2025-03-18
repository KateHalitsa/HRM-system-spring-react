import React, {FC} from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

/*const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'PV',
            data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            backgroundColor: 'rgba(136, 198, 255, 0.6)',
        },
        {
            label: 'UV',
            data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
            backgroundColor: 'rgba(130, 202, 157, 0.6)',
        },
    ],
};
*/
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const, // Используем 'as const' для указания типа
        },
        title: {
            display: true,
            text: 'Статистика по проектам',
        },
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};
interface ProjectStatistic {
    projectName: string;
    totalEffectiveness: number;
}

interface IStackBarChartProps {
    projectsData: ProjectStatistic[];
    newValues: ProjectStatistic;
    totalEffectiveness: number;
}
const StackBarChart: FC<IStackBarChartProps> = ({ projectsData, newValues,totalEffectiveness }) => {

    // Получаем метки и значения из projectsData
    const labels = projectsData.map(project => project.projectName);
    const values = projectsData.map(project => project.totalEffectiveness);

    // Добавляем значение из newValues
    //const newValueIndex = labels.indexOf(newValues.projectName);
   /* if (newValueIndex !== -1) {
        values[newValueIndex] += newValues.totalEffectiveness; // Обновляем значение, если проект найден
    } else {
        labels.push(newValues.projectName);
        values.push(newValues.totalEffectiveness); // Добавляем новый проект, если не найден
    }*/
    // Создаем пустой массив для новых значений
    const newValuesList = Array(values.length).fill(0); // Инициализируем нулями

    // Определяем индекс нового значения
    const newValueIndex = labels.indexOf(newValues.projectName);
    if (newValueIndex !== -1) {
        // Если проект найден, добавляем значение в массив
        newValuesList[newValueIndex] = totalEffectiveness;
    } else {
        // Если проект не найден, добавляем новый проект
        labels.push(newValues.projectName);
        values.push(0); // Для нового проекта начальное значение 0
        newValuesList.push(newValues.totalEffectiveness); // Добавляем новое значение
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Эффективность проектов',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Дополнительная эффективность',
                data: values.map((value, index) => (index === newValueIndex ? totalEffectiveness : 0)),
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Цвет для нового значения
            },
        ],

    };

  /*  const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Статистика проектов',
            },
        },
    };*/
    return <Bar data={data} options={options} />;
};

export default StackBarChart;