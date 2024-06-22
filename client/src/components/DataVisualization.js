import React, { useState, useEffect } from 'react';
import { fetchCombinedData } from '../utils/api';
import { MONTHS } from '../utils/constants';
import Dropdown from '../components/Dropdown';
import Statistics from '../components/Statistics';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';



const DataVisualization = () => {
  const [month, setMonth] = useState('March');
  const [combinedData, setCombinedData] = useState(null);

  const getCombinedData = async () => {
    try {
      const data = await fetchCombinedData(month);
      setCombinedData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching combined data:', error);
    }
  };

  useEffect(() => {
    getCombinedData();
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  if (!combinedData) {
    return <div>Loading..!</div>
  }
  return (
    <div className="py-4">
      <div className='flex items-center p-4'>
        <h3 className='mr-3'>Select a month </h3>
        <Dropdown value={month} onChange={handleMonthChange} options={MONTHS} />
      </div>
      <div className="">
        <Statistics 
          totalSaleAmount={combinedData?.statistics?.totalSaleAmount} 
          totalSoldItems={combinedData?.statistics?.totalSoldItems} 
          totalNotSoldItems={combinedData?.statistics?.totalNotSoldItems} 
        />
        <PieChart 
          className={{ width: "300px" }}       
          data={combinedData?.pieChartData} 
        />
        <BarChart data={combinedData?.barChartData} />
      </div>
    </div>
  )
}

export default DataVisualization;