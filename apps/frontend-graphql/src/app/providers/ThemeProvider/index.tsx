import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { defaultTheme } from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
