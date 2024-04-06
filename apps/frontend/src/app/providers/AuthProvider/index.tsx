import { createContext, PropsWithChildren, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { login, logout } from '@frontend/api/auth';
import useNotifications from '@frontend/hooks/useNotifications';
import { CustomError, ILogin, ILoginResponse } from '@frontend/types';
import { LOCAL_STORAGE_KEYS } from '@frontend/utils/constants';

interface AuthProps {
  handleLogin: (data: ILogin) => void;
  handleLogout: () => void;
  isAuth: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken) || ''
  );

  const [isAuth, setIsAuth] = useState(!!accessToken);

  const { handleError } = useNotifications();
  const onError = (error: CustomError) => handleError(error);

  const { mutate: handleLogin, isPending: isLoginLoading } = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }: ILoginResponse) => {
      setIsAuth(true);
      setAccessToken(accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);
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
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
