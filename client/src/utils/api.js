import axios from 'axios';
import { BASE_URL } from './constants';

export const fetchTransactions = async ({ page, perPage, search, month }) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`, {
      params: {
        page,
        perPage,
        search,
        month,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const fetchCombinedData = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-data`, { 
      params: { 
        month,
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching combined data:', error);
    throw error;
  }
};
