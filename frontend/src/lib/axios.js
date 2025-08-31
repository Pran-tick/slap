//https://slap-backend.vercel.app/api this is the project backend link.

import axios from 'axios';
const BASE_URL = import.meta.env.MODE === 'Development'
  ? 'http://localhost:3000/api'
  : 'https://slap-backend.vercel.app/api';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
