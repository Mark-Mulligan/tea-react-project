// React
import * as React from 'react';
import { useState, useEffect } from 'react';

// Next
import type { AppProps } from 'next/app';

// Emotion
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';

// MUI
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// Themes
import darkThemeOptions from '../styles/theme/darkThemeOptions';
import lightThemeOptions from '../styles/theme/lightThemeOptions';

// Components
import Navbar from '../componets/Navbar';

// Context
import { DarkModeContext } from '@/context/darkModeContext';

// Styles
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [darkMode, setDarkMode] = useState(true);

  useEffect(function () {
    if (typeof window !== 'undefined') {
      const mode = localStorage.getItem('omdbTheme');

      if (mode === 'light') {
        setDarkMode(false);
      }
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </DarkModeContext.Provider>
    </CacheProvider>
  );
};

export default MyApp;
