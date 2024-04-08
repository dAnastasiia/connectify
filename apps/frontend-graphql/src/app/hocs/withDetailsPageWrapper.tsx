import { ComponentType, Context } from 'react';
import { useParams } from 'react-router-dom';

import { QueryKey, RefetchOptions } from '@tanstack/react-query';

import PageWrapper from '@frontend-graphql/ui-kit/PageWrapper';

import { ContextProps, CustomError } from '@frontend-graphql/types';

export type GetQuery = <T>({
  queryKey,
  id,
}: {
  queryKey: QueryKey;
  id: string;
}) => {
  data: T | undefined;
  isLoading: boolean;
  error: CustomError | null;
  refetch: (options?: RefetchOptions | undefined) => Promise<T>;
};

interface withDetailsPageWrapperProps<T> {
  WrappedComponent: ComponentType;
  idParam: string;
  getQuery: GetQuery;
  Context: Context<ContextProps<T>>;
}

export default function withDetailsPageWrapper<T>({
  WrappedComponent,
  idParam,
  getQuery,
  Context,
}: withDetailsPageWrapperProps<T>) {
  return function () {
    const params = useParams();
    const id = params[idParam] || '';

    const { data, isLoading, refetch, error } = getQuery({
      queryKey: [id],
      id,
    });

    return (
      <PageWrapper isLoading={isLoading} error={error as CustomError}>
        <Context.Provider value={{ refetch: () => refetch(), data: data as T }}>
          <WrappedComponent />
        </Context.Provider>
      </PageWrapper>
    );
  };
}
