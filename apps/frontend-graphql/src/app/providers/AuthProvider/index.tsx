import { createContext, PropsWithChildren, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { login, logout } from '@frontend-graphql/api/auth';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError, ILogin, ILoginResponse } from '@frontend-graphql/types';
import { LOCAL_STORAGE_KEYS } from '@frontend-graphql/utils/constants';

interface AuthProps {
  handleLogin: (data: ILogin) => void;
  handleLogout: () => void;
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

  const { handleError } = useNotifications();
  const onError = (error: CustomError) => handleError(error);

  const { mutate: handleLogin, isPending: isLoginLoading } = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, userId }: ILoginResponse) => {
      setIsAuth(true);
      setAccessToken(accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);

      setUserId(userId);
      localStorage.setItem(LOCAL_STORAGE_KEYS.userId, userId);
    },
    onError,
  });

  const { mutate: handleLogout, isPending: isLogoutLoading } = useMutation({
    mutationFn: logout,
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
