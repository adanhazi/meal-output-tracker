import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-base-url.com/',
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here
  },
  // Additional configurations like timeouts
});

export default apiClient;
