import { useEffect } from 'react';

import {
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ClientError } from 'graphql-request';

import { CustomError } from '@frontend-graphql/types';

import { handleGenericError, handleGraphQLErrors } from './utils';

interface UseGraphQLMutationProps<T, P> {
  mutationFn: (data: T) => Promise<P>;
  onSuccess: (data: P) => void;
  onError: (errors: CustomError[]) => void;
}

export const useGraphQLMutation = <T, P>({
  onSuccess,
  onError,
  mutationFn,
}: UseGraphQLMutationProps<T, P>) => {
  const { mutate, isPending, isSuccess, data, error } = useMutation({
    mutationFn,
  });

  useEffect(() => {
    if (data && isSuccess) {
      onSuccess(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error) {
      const errors = (error as ClientError).response.errors;

      if (errors?.length) {
        onError(handleGraphQLErrors(errors));
      } else {
        onError(handleGenericError());
      }
    }
  }, [error]);

  return { mutate, isPending };
};

interface UseGraphQLQueryProps<T> {
  queryFn: () => Promise<T>;
  queryKey: QueryKey;
}

export const useGraphQLQuery = <T>({
  queryKey,
  queryFn,
}: UseGraphQLQueryProps<T>) => {
  const { data, isLoading, error, refetch } = useQuery<T, CustomError>({
    queryKey,
    queryFn,
  });

  return { data, isLoading, error, refetch };
};
