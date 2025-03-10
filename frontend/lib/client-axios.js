import axios from 'axios';
import { getAccessTokenCookie } from '../utils/token/get-token'

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenCookie();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

