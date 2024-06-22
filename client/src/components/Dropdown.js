import React from 'react';

const Dropdown = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="mr-4 p-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition duration-200"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
