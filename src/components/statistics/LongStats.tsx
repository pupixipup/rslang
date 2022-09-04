import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { ILongStats } from '../../common/interfaces';

import "./longStats.scss";

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
        display: false,
        text: 'Статистика за все время',
      },
    },
  };

export function LongStats(props: {longStatsArray:ILongStats[]}){
    const array = props.longStatsArray;
    if (!array.length) return (
        <p> </p>
    );
    const labels = array.map((item) => item.date);
    const data = {
        labels,
        datasets: [
          {
            label: 'Новые',
            data: array.map((item) => item.newWords),
            backgroundColor: 'rgb(224, 94, 94)',
          },
          {
            label: 'Изученные',
            data: array.map((item) => item.learnedWords),
            backgroundColor: 'rgb(120, 195, 162)',
          },
        ],
      };
return (
    <Bar className='bar'
    options={options}
  data={data}
     />
)
}
// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );



// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function App() {
//   return <Bar options={options} data={data} />;
// }
