/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useEffect, useContext } from "react";

// Next
import Head from "next/head";
import { useRouter } from "next/router";

// axios
import axios from "axios";

// react-scroll
import { scroller } from "react-scroll";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// Types
import { type OMDBSearchResponse, type OMDBErrorResponse } from "../customTypes/omdbApi";

// Components
import MovieSearch from "@/componets/MovieSearch";
import InfinateScroll from "@/componets/InfinateScroll";
import MediaCard from "@/componets/MediaCard";

// Context
import { AppContext } from "@/context/AppContext";

// utils
import { createOMDBSearchURLObject } from "@/utils/api";

export default function Home() {
  const router = useRouter();

  const {
    searchResults,
    setSearchResults,
    nextPage,
    setNextPage,
    searchResultCount,
    setSearchResultCount,
    previousSearchString,
    setPreviousSearchString,
    selectedMediaId,
    setSelectedMediaId,
  } = useContext(AppContext);

  const [noResultsText, setNoResultsText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieSearch = async (searchString: string) => {
      // Data is already loaded so no need to fetch again
      if (previousSearchString === searchString) {
        return;
      }

      try {
        setIsLoading(true);
        setSearchResults([]);
        setSearchResultCount(0);
        setSelectedMediaId("");
        const { data } = await axios.get<{ results: OMDBSearchResponse | OMDBErrorResponse; nextPage: string }>(`/api/movies/search${searchString}`);

        setPreviousSearchString(searchString);

        // This is for when no results are returned in a users search (OMDBErrorResponse).
        if (data.results.Response === "False") {
          setSearchResults([]);
          setSearchResultCount(0);
          setNextPage("");
          setNoResultsText(data.results.Error);
        } else {
          setSearchResultCount(Number(data.results.totalResults));
          setSearchResults(data.results.Search);
          setNextPage(data.nextPage);
          setNoResultsText("");
        }
      } catch (err) {
        console.log(err);
        setSearchResults([]);
        setSearchResultCount(0);
        setNextPage("");
        setNoResultsText("Search failed.");
      }
      setIsLoading(false);
    };

    if (router.query) {
      const url = createOMDBSearchURLObject(router, "router");

      if (url.search) {
        getMovieSearch(url.search);
      }
    }
  }, [router.query]);

  useEffect(() => {
    /**
     * This is used to scroll down to where the user last clicked in the search after navigating to the individual media page. For example,
     * if they picked a result that was 50 items in, this would keep there place when they return to the search after selecting that item.
     */
    if (selectedMediaId) {
      scroller.scrollTo(selectedMediaId, {
        duration: 600,
        delay: 100,
        smooth: true,
        offset: -100, // Scrolls to element - 100 pixels up the page
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>OMDB - Online Movie Database</title>
        <meta
          name='description'
          content='Home to data on thousands of movies, tv-shows, series and more, OMDBDatabase allows you to search and filter all of that data to easily find what you are looking for. OMDB also gives you the ability to select individual titles to view more information about them such as the plot, cast, box office earnings and more!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta prefix='og: http://ogp.me/ns#' property='og:type' content='website' />
        <meta name='title' property='og:title' content='OMDB - Online Movie Database' />
        <meta name='image' property='og:image' content='https://tea-omdb-moviesearch.netlify.app/omdbHomePage.jpg' />
        <meta name='url' property='og:url' content='https://tea-omdb-moviesearch.netlify.app' />
        <meta
          name='description'
          property='og:description'
          content='Home to data on thousands of movies, tv-shows, series and more, OMDBDatabase allows you to search and filter all of that data to easily find what you are looking for. OMDB also gives you the ability to select individual titles to view more information about them such as the plot, cast, box office earnings and more!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Container sx={{ paddingTop: "2em", paddingBottom: "2rem", minHeight: "100vh" }}>
          <Typography variant='h1' align='center' sx={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            Search Movies
          </Typography>
          <MovieSearch setSearchResultCount={setSearchResultCount} setSearchResults={setSearchResults} />
          {isLoading && (
            <Box sx={{ display: "flex", position: "relative", zIndex: "10" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "calc(50% - 40px)",
                  top: "40px",
                }}
              >
                <CircularProgress size={80} />
              </Box>
            </Box>
          )}
          {noResultsText && <Typography textAlign='center'>{noResultsText}</Typography>}
          {searchResultCount > 0 && (
            <Typography textAlign='center' color='text.secondary' sx={{ marginBottom: "1rem" }}>
              {searchResultCount} Results
            </Typography>
          )}
          {searchResults.length > 0 && (
            <Grid container spacing={4}>
              {searchResults.map((result) => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={result.imdbID}>
                    <MediaCard data={result} />
                  </Grid>
                );
              })}
              {nextPage && <InfinateScroll nextPage={nextPage} searchResults={searchResults} setSearchResults={setSearchResults} setNextPage={setNextPage} />}
            </Grid>
          )}
        </Container>
      </main>
    </>
  );
}
