import { useContext } from 'react';
import { LoggerContext } from '@frontend/providers/LoggerProvider';

export default function useLogger() {
  return useContext(LoggerContext);
}
