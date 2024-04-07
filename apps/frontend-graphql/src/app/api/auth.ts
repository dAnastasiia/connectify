import { useMutation } from '@tanstack/react-query';
import { ClientError, gql } from 'graphql-request';

import axios from './axios';
import graphQLClient from './graphql';

import {
  CustomError,
  ILogin,
  ILoginResponse,
  ISignup,
} from '@frontend-graphql/types';
import { useEffect } from 'react';

const path = 'auth';

export const useSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async ({ name, email, password }: ISignup) => {
      try {
        const { signup } = await graphQLClient.request(gql`
           mutation { 
             signup(inputData: { name: "${name}", email: "${email}", password: "${password}" }) { 
               name
               email 
             } 
           }
         `);

        return signup;
      } catch (error) {
        const errors = (error as ClientError).response.errors;

        if (errors?.length) {
          // * Convert GraphQL errors to CustomError type
          const customErrors: CustomError[] = errors.map((err: any) => ({
            message: err.message,
            status: err.status,
            errors: err.errors,
          }));

          onError(customErrors);
        } else {
          return onError([{ message: 'Unknown error occurred', status: 500 }]);
        }

        throw error;
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return { mutate, isPending };
};

export const login = async (data: ILogin) => {
  const response = await axios.post<ILoginResponse>(`${path}/login`, data);

  return response.data;
};

export const logout = () => axios.get(`${path}/logout`);
