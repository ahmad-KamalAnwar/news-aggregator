import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3009', // Replace with your API base URL
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set the content type for requests
  },
});

export default axiosInstance;
