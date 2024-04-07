import axios from 'axios';

import { LOCAL_STORAGE_KEYS } from '@frontend-graphql/utils/constants';
import getJwtExpDate from '@frontend-graphql/utils/getJwtExpDate';

import { handleLogout } from './handleLogout';

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
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

    const expirationDate = getJwtExpDate(accessToken);
    const isTokenExpired = expirationDate < Date.now();

    if (accessToken && !isTokenExpired) {
      config.headers.Authorization = 'Bearer ' + accessToken;
      return config;
    }

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
    const {
      response: { data, status },
    } = error;

    if (status === 401) {
      handleLogout();
    }

    return Promise.reject(data);
  }
);

export default axiosInstance;
