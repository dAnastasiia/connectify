import axios from './axios';
import { ILogin, ISignup } from '@frontend/types';

const path = 'auth';

export const signup = async (data: ISignup) =>
  await axios.post(`${path}/signup`, data);

export const login = async (data: ILogin) =>
  await axios.post(`${path}/login`, data);
