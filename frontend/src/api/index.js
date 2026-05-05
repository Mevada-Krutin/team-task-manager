import axios from 'axios';

const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return url.endsWith('/api') ? url : `${url.replace(/\/$/, '')}/api`;
};

const API = axios.create({ 
  baseURL: getBaseURL() 
});


API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
