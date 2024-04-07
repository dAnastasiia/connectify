import { useContext } from 'react';
import { LoggerContext } from '@frontend-graphql/providers/LoggerProvider';

export default function useLogger() {
  return useContext(LoggerContext);
}
