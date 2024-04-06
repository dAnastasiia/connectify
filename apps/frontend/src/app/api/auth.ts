import axios from './axios';
import { ILogin, ILoginResponse, ISignup } from '@frontend/types';

const path = 'auth';

export const signup = async (data: ISignup) =>
  await axios.post(`${path}/signup`, data);

export const login = async (data: ILogin) => {
  const response = await axios.post<ILoginResponse>(`${path}/login`, data);

  return response.data;
};

export const logout = () => axios.get(`${path}/logout`);
