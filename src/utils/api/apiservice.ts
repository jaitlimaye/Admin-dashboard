import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  const response = await api.get('/users?delay=3');
  console.log('Response:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
};
