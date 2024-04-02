import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  components: {
    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiTextField: {
      defaultProps: { helperText: ' ', size: 'small', variant: 'standard' },
    },
    MuiStack: { defaultProps: { spacing: 2 } },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
