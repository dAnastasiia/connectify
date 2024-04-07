import { ComponentType, Context, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import PageWrapper from '@frontend-graphql/ui-kit/PageWrapper';

import { ContextProps, CustomError } from '@frontend-graphql/types';

interface withDetailsPageWrapperProps<T> {
  WrappedComponent: ComponentType;
  idParam: string;
  getQuery: (id: string) => Promise<T>;
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

    const { data, isPending, refetch, error } = useQuery<T, CustomError>({
      queryKey: [id],
      queryFn: () => getQuery(id),
    });

    return (
      <PageWrapper isLoading={isPending} error={error}>
        <Context.Provider value={{ refetch: () => refetch(), data: data as T }}>
          <WrappedComponent />
        </Context.Provider>
      </PageWrapper>
    );
  };
}
