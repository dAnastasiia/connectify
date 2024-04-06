import { ReactNode } from 'react';

import { CustomError } from '@frontend/types';

import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';

interface ContainerWrapperProps {
  isLoading: boolean;
  error: CustomError | null;
  children: ReactNode;
}

export default function PageWrapper({
  isLoading,
  error,
  children,
}: ContainerWrapperProps) {
  if (error) {
    return <ErrorMessage status={error?.status} message={error?.message} />;
  }

  if (isLoading) return <Loader />;

  return <> {children} </>;
}
