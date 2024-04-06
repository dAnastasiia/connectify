import axios from './axios';
import { ISignup } from '@frontend/types';

const path = 'auth';

export const signup = async (data: ISignup) =>
  await axios.post(`${path}/signup`, data);
