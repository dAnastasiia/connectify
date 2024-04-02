import { createContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

import { CustomError } from '@frontend/types';
import useLogger from '@frontend/hooks/useLogger';

export const NotificationsContext = createContext<NotificationsProps>(
  {} as NotificationsProps
);

export interface NotificationsProps {
  handleError: (error: CustomError) => void;
  handleSuccess: (message: string) => void;
}

export default function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const logger = useLogger();

  const handleSuccess = (message: string) => {
    toast.success(message);
  };

  const handleError = ({ errors, message = '' }: CustomError) => {
    if (errors?.length) {
      errors?.forEach((error) => {
        logger.error(error?.msg);
        toast.error(error?.msg);
      });
      return;
    }

    if (message) {
      logger.error(message);
      toast.error(message);
    }
  };

  return (
    <NotificationsContext.Provider value={{ handleSuccess, handleError }}>
      {children}
    </NotificationsContext.Provider>
  );
}
