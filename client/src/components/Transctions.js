import React, { useState, useEffect } from 'react';
import { MONTHS } from '../utils/constants';
import Dropdown from '../components/Dropdown';
import { fetchTransactions } from '../utils/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const getTransactions = async () => {
    try {
      const data = await fetchTransactions({ page, perPage, search, month });
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [page, search, month]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1);
  };

  if (!transactions) {
    return <div>Loading..!</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Table</h1>
      <div className="mb-4 flex justify-between">
        <div className='flex items-center'>
          <h3 className='mr-3'>Select a month </h3>
          <Dropdown value={month} onChange={handleMonthChange} options={MONTHS} />
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search transactions..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Date of Sale</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">
                  <img 
                    src={transaction.image} 
                    alt={transaction.title} 
                    className="w-20 h-20 object-cover" 
                  />
                </td>
                <td className="border px-4 py-2">{transaction.title}</td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td className="border px-4 py-2">₹{transaction.price}</td>
                <td className="border px-4 py-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{transaction.category}</td>
                <td className="border px-4 py-2">{transaction.sold ? 'Sold' : 'Unsold'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {page}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
