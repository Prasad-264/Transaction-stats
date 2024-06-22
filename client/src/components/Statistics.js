import React from 'react';

const Statistics = ({ totalSaleAmount, totalSoldItems, totalNotSoldItems }) => {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Transactions Statistics</h1>
      <div className="grid grid-cols-3 gap-4 rounded-lg">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Total Sale Amount</h3>
          <p>₹ {totalSaleAmount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Total Sold Items</h3>
          <p>{totalSoldItems}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">Total Not Sold Items</h3>
          <p>{totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
