import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '@frontend-graphql/hooks/useAuth';
import { Routes } from '@frontend-graphql/constants/Routes';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();

  const { home } = Routes;

  return isAuth ? (
    <Navigate to={home.baseRoutes.URL} replace />
  ) : (
    <> {children} </>
  );
}
