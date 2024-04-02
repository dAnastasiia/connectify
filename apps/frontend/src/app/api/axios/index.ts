import axios from 'axios';

import { environment } from '../../../environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: { indexes: null },
});

export default axiosInstance;
