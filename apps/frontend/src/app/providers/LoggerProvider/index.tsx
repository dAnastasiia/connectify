import { createContext, ReactNode } from 'react';

export const LoggerContext = createContext<LoggerContextProps>(
  {} as LoggerContextProps
);

type LoggerMethod = (message: string) => void;

interface LoggerContextProps {
  error: LoggerMethod;
  log?: LoggerMethod;
  warn?: LoggerMethod;
}

export default function LoggerProvider({ children }: { children: ReactNode }) {
  const error = (message: string) => {
    console.error(message);
  };

  return (
    <LoggerContext.Provider value={{ error }}>
      {children}
    </LoggerContext.Provider>
  );
}
