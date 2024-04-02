import axios from 'axios';

import { environment } from '../../../environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: { indexes: null },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // ...

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // ...

    const {
      response: { data },
    } = error;

    return Promise.reject(data);
  }
);

export default axiosInstance;
