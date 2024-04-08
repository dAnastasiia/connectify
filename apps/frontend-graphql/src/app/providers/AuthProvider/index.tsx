import { createContext, PropsWithChildren, useState } from 'react';

import { UseMutateFunction } from '@tanstack/react-query';

import { useLogin, useLogout } from '@frontend-graphql/api/auth';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError, ILogin, ILoginResponse } from '@frontend-graphql/types';
import { LOCAL_STORAGE_KEYS } from '@frontend-graphql/utils/constants';

interface AuthProps {
  handleLogin: (data: ILogin) => void;
  handleLogout: UseMutateFunction<any, Error, unknown, unknown>;
  isAuth: boolean;
  userId: string;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken) || ''
  );

  const [isAuth, setIsAuth] = useState(!!accessToken);
  const [userId, setUserId] = useState('');

  const { handleErrors } = useNotifications();
  const onError = (errors: CustomError[]) => handleErrors(errors);

  const { mutate: handleLogin, isPending: isLoginLoading } = useLogin({
    onSuccess: ({ accessToken, userId }: ILoginResponse) => {
      setIsAuth(true);
      setAccessToken(accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);

      setUserId(userId);
      localStorage.setItem(LOCAL_STORAGE_KEYS.userId, userId);
    },
    onError,
  });

  const { mutate: handleLogout, isPending: isLogoutLoading } = useLogout({
    onSuccess: () => {
      setIsAuth(false);
      localStorage.clear();
    },
    onError,
  });

  const isLoading = isLoginLoading || isLogoutLoading;

  const value = {
    handleLogin,
    handleLogout,
    isAuth,
    userId,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
