import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../components/ChartsSetup';

const PieChart = ({ data }) => {
  const pieData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Transactions Pie Chart</h1>
      <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default PieChart;
