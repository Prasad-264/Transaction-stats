import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../components/ChartsSetup';

const BarChart = ({ data }) => {
  const barData = {
    labels: data.map(item => item.priceRange),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map(item => item.count),
        backgroundColor: '#EE7D31',
      },
    ],
  };

  return (
    <div className="py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Bar Chart</h1>
      <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default BarChart;
