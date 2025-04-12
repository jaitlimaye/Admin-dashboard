import axios from 'axios';
import { User } from '../types/data/datatype';
import { getApiResponse } from '../types/response/listresponsetype';
import { containerClasses } from '@mui/material';

const API_BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  let page = 1;
  let allUsers: User[] = [];
  let totalPages = 1;
  
  do {
    const response  = await api.get(`/users?page=${page}`) ;
    const data = response.data; 
    totalPages = data.total_pages;
    console.log('Response:', response); 
    allUsers = [...allUsers, ...data.data]; 
    console.log(allUsers); 
    page++;
  } while (page <= totalPages);
  if(!allUsers) {
    throw new Error('No data found in the response');
  }
  return allUsers; // Return only the data property
};

export const getUserData = async (id : string) => {
  const response = await api.get(`/users/${id}`);
  console.log('Response:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
};

