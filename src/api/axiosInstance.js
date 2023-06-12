import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`, // Replace with your API base URL
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/ld+json',
      'Content-Type': 'application/json'
  },
});

export default axiosInstance;
