import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { ClientError } from 'graphql-request';

import { CustomError } from '@frontend-graphql/types';

import { handleGenericError, handleGraphQLErrors } from './utils';

interface UseGraphQLProps<T, P> {
  mutationFn: (data: T) => Promise<P>;
  onSuccess: (data: P) => void;
  onError: (errors: CustomError[]) => void;
}

export default function useGraphQL<T, P>({
  onSuccess,
  onError,
  mutationFn,
}: UseGraphQLProps<T, P>) {
  const { mutate, isPending, isSuccess, data, error } = useMutation({
    mutationFn,
  });

  useEffect(() => {
    if (data && isSuccess) {
      onSuccess(data);
    }
  }, [isSuccess, onSuccess, data]);

  useEffect(() => {
    if (error) {
      const errors = (error as ClientError).response.errors;

      if (errors?.length) {
        onError(handleGraphQLErrors(errors));
      } else {
        onError(handleGenericError());
      }
    }
  }, [error, onError]);

  return { mutate, isPending };
}
