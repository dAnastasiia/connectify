import { createContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

import { CustomError } from '@frontend-graphql/types';
import useLogger from '@frontend-graphql/hooks/useLogger';

export const NotificationsContext = createContext<NotificationsProps>(
  {} as NotificationsProps
);

export interface NotificationsProps {
  handleSuccess: (message: string) => void;
  handleErrors: (errors: CustomError[]) => void;
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

  const handleErrors = (errors: CustomError[]) => {
    errors?.forEach(({ message, errors }) => {
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
    });
  };

  return (
    <NotificationsContext.Provider value={{ handleSuccess, handleErrors }}>
      {children}
    </NotificationsContext.Provider>
  );
}
