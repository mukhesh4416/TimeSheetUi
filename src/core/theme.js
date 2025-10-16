// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6287bd',
      main: '#2c5693',
      dark: '#0e4491',
      contrastText: '#fff',
    },
    secondary: {
      light: '#79a2bd',
      main: '#6e808c',
      dark: '#5b6871',
      contrastText: '#fff',
    },
  },
});

export default theme;
