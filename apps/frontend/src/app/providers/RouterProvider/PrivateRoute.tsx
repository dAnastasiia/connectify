import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '@frontend/hooks/useAuth';
import { Routes } from '@frontend/constants/Routes';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();

  const { login } = Routes;

  return isAuth ? (
    <> {children} </>
  ) : (
    <Navigate to={login.baseRoutes.URL} replace />
  );
}
