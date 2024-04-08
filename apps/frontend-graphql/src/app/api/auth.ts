import { gql } from 'graphql-request';
import graphQLClient from './graphql';

import useGraphQL from '@frontend-graphql/hooks/useGraphQL';
import {
  CustomError,
  ILogin,
  ILoginResponse,
  ISignup,
} from '@frontend-graphql/types';

export const useSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending } = useGraphQL({
    mutationFn: async ({ name, email, password }: ISignup) => {
      const { signup } = await graphQLClient.request(gql`
           mutation { 
             signup(inputData: { name: "${name}", email: "${email}", password: "${password}" }) { 
               name
               email 
             } 
           }
         `);

      return signup;
    },
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: ILoginResponse) => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending } = useGraphQL({
    mutationFn: async ({ email, password }: ILogin) => {
      const { login } = await graphQLClient.request(gql`
            mutation { 
              login(inputData: { email: "${email}", password: "${password}" }) { 
                accessToken
                userId 
              } 
            }
          `);

      return login;
    },
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending } = useGraphQL({
    mutationFn: async () => {
      const { logout } = await graphQLClient.request(gql`
        mutation {
          logout
        }
      `);

      return logout;
    },
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};
