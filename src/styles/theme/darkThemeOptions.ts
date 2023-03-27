import { ThemeOptions } from '@mui/material/styles';

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(29, 78, 216)',
      contrastText: '#fff',
    },

    background: {
      default: 'rgb(7, 7, 7)',
      paper: 'rgba(12, 22, 35)',
    },
  },
};

export default darkThemeOptions;
