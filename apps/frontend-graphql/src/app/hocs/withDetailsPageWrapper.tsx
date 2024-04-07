import { io } from 'socket.io-client';

import { ComponentType, Context, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import PageWrapper from '@frontend-graphql/ui-kit/PageWrapper';

import { ContextProps, CustomError } from '@frontend-graphql/types';

import { environment } from '../../environments/environment';

interface withDetailsPageWrapperProps<T> {
  WrappedComponent: ComponentType;
  idParam: string;
  collectionName: string;
  getQuery: (id: string) => Promise<T>;
  Context: Context<ContextProps<T>>;
}

export default function withDetailsPageWrapper<T>({
  WrappedComponent,
  idParam,
  collectionName,
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

    useEffect(() => {
      const socket = io(environment.API_URL);

      socket.on(collectionName, ({ action }) => {
        if (action === 'update') refetch();
      });

      return () => {
        socket.disconnect();
      };
    }, []);

    return (
      <PageWrapper isLoading={isPending} error={error}>
        <Context.Provider value={{ refetch: () => refetch(), data: data as T }}>
          <WrappedComponent />
        </Context.Provider>
      </PageWrapper>
    );
  };
}
