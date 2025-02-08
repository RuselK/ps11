import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
