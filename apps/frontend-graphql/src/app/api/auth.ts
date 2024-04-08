import { gql } from 'graphql-request';
import graphQLClient from './graphql';

import { useGraphQLMutation } from '@frontend-graphql/hooks/useGraphQL';
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
  const { mutate, isPending } = useGraphQLMutation({
    mutationFn: async ({ name, email, password }: ISignup) => {
      const { signup } = await graphQLClient.request(
        gql`
          mutation Signup($name: String!, $email: String!, $password: String!) {
            signup(
              inputData: { name: $name, email: $email, password: $password }
            ) {
              name
              email
            }
          }
        `,
        { name, email, password } // * Another suntax how to use dynamic data
      );

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
  const { mutate, isPending } = useGraphQLMutation({
    mutationFn: async ({ email, password }: ILogin) => {
      const { login } = await graphQLClient.request(
        gql`
          mutation Login($email: String!, $password: String!) {
            login(inputData: { email: $email, password: $password }) {
              accessToken
              userId
            }
          }
        `,
        { email, password }
      );

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
  const { mutate, isPending } = useGraphQLMutation({
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
