import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(29 78 216)',
      contrastText: '#fff',
    },
    background: {
      default: 'rgb(245, 245, 245)',
      paper: 'rgba(220, 220, 220)',
    },
  },
};

export default lightThemeOptions;
