import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#345995',
    },
    secondary: {
      main: '#905CEB',
    },

    background: { default: '#F8F6F1' },
  },

  components: {
    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiTextField: {
      defaultProps: { helperText: ' ', size: 'small', variant: 'standard' },
    },
    MuiStack: { defaultProps: { spacing: 2 } },
    MuiGrid: { defaultProps: { spacing: 3 } },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
