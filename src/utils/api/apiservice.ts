import axios from 'axios';
import { User } from '../types/data/datatype';
import { createUserRequest } from '../types/request/createUserRequesttype';
import { registerRequest } from '../types/request/registerRequesttype';

const API_BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async (delay : number) => {
  let page = 1;
  let allUsers: User[] = [];
  let totalPages = 1;
  
  do {
    const response  = await api.get(`/users?page=${page}&delay=${delay}`); ;
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
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
};

export const patchUserData = async (id : string, data : {[key: string] : string}) => {
  const response = await api.patch(`/users/${id}`, data);
  console.log('Response:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
}

export const postLoginData = async (data : {email: string, password: string}) => {
  const response = await api.post(`/login`, data);
  console.log('Response to Login:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
}

export const postRegisterData = async (data : registerRequest) => {
  const response = await api.post(`/register`, data);
  console.log('Response to Register:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
}
export const postCreateUserData = async (data : createUserRequest) => {
  console.log('Data to Create:', data); // Log the data being sent
  const response = await api.post(`/users`, data);
  console.log('Response to Create:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
}

export const deleteUserData = async (id : string) => {
  const response = await api.delete(`/users/${id}`);
  console.log('Response to Delete:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
}

export const putEditUserData = async (data : User) => {
  const response = await api.put(`/users/${data.id}`, data);
  console.log('Response to Edit:', response); // Log the entire response object
  if(!response.data) {
    throw new Error('No data found in the response');
  }
  return response.data; // Return only the data property
}

