import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(29, 78, 216)',
      contrastText: '#fff',
    },
    background: {
      default: 'rgb(230, 230, 230)',
      paper: 'rgba(200, 200, 200)',
    },
  },
};

export default lightThemeOptions;
