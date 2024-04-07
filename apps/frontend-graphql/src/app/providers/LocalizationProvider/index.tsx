import { ReactNode } from 'react';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

interface LocalizationProviderProps {
  children: ReactNode;
}

export default function LocalizationProvider({
  children,
}: LocalizationProviderProps) {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterLuxon}>
      {children}
    </MuiLocalizationProvider>
  );
}
