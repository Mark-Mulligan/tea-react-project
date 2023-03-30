// React
import * as React from "react";
import { useState, useEffect } from "react";

// Next
import type { AppProps } from "next/app";
import Head from "next/head";

// Emotion
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";

// MUI
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

// Themes
import darkThemeOptions from "../styles/theme/darkThemeOptions";
import lightThemeOptions from "../styles/theme/lightThemeOptions";

// Components
import Navbar from "../componets/Navbar";

// Context
import { AppContext } from "@/context/AppContext";

// Types
import { OMDBMovieSearchData } from "@/customTypes/omdbApi";

// Styles
import "../styles/globals.css";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [darkMode, setDarkMode] = useState(true);
  const [searchResults, setSearchResults] = useState<OMDBMovieSearchData[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [selectedMediaId, setSelectedMediaId] = useState("");
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [previousSearchString, setPreviousSearchString] = useState("");

  useEffect(function () {
    if (typeof window !== "undefined") {
      const mode = localStorage.getItem("omdbTheme");

      if (mode === "light") {
        setDarkMode(false);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'></meta>
      </Head>
      <CacheProvider value={emotionCache}>
        <AppContext.Provider
          value={{
            darkMode,
            setDarkMode,
            searchResults,
            setSearchResults,
            nextPage,
            setNextPage,
            selectedMediaId,
            setSelectedMediaId,
            searchResultCount,
            setSearchResultCount,
            previousSearchString,
            setPreviousSearchString,
          }}
        >
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Navbar />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppContext.Provider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
