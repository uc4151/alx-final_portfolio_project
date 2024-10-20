import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;