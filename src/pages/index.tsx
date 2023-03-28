/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, type FormEvent, useEffect } from 'react';

// Next
import Head from 'next/head';
import { useRouter } from 'next/router';

// axios
import axios from 'axios';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

// Types
import { type OMDBSearchResponse, type OMDBMovieSearchData, type OMDBErrorResponse } from '../customTypes/omdbApi';

// Components
import MovieSearch from '@/componets/MovieSearch';
import InfinateScroll from '@/componets/InfinateScroll';
import MediaCard from '@/componets/MediaCard';

// utils
import { createOMDBSearchURLObject } from '@/utils/api';

export default function Home() {
  const router = useRouter();

  const [searchResultCount, setSearchResultCount] = useState(0);
  const [nextPage, setNextPage] = useState('');
  const [noResultsText, setNoResultsText] = useState('');
  const [searchResults, setSearchResults] = useState<OMDBMovieSearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieSearch = async (searchString: string) => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<{ results: OMDBSearchResponse | OMDBErrorResponse; nextPage: string }>(
          `/api/movies/search${searchString}`,
        );

        // This is for when no results are returned in a users search (OMDBErrorResponse).
        if (data.results.Response === 'False') {
          setSearchResults([]);
          setSearchResultCount(0);
          setNextPage('');
          setNoResultsText(data.results.Error);
        } else {
          setSearchResultCount(Number(data.results.totalResults));
          setSearchResults(data.results.Search);
          setNextPage(data.nextPage);
          setNoResultsText('');
        }
      } catch (err) {
        console.log(err);
        setSearchResults([]);
        setSearchResultCount(0);
        setNextPage('');
        setNoResultsText('Search failed.');
      }
      setIsLoading(false);
    };

    if (router.query) {
      const url = createOMDBSearchURLObject(router, 'router');

      if (url.search) {
        getMovieSearch(url.search);
      }
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>OMDB - Online Movie Database</title>
        <meta name="description" content="Search for movies, tv-shows, series and more using the OMDB Database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ paddingTop: '2em', paddingBottom: '2rem' }}>
          <Typography variant="h1" align="center" sx={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Search Movies
          </Typography>
          <MovieSearch setSearchResultCount={setSearchResultCount} setSearchResults={setSearchResults} />
          {isLoading && (
            <Box sx={{ display: 'flex', position: 'relative', zIndex: '10' }}>
              <CircularProgress sx={{ position: 'absolute', left: 'calc(50% - 25px)' }} />
            </Box>
          )}
          {noResultsText && <Typography textAlign="center">{noResultsText}</Typography>}
          {searchResultCount > 0 && (
            <Typography textAlign="center" color="text.secondary" sx={{ marginBottom: '1rem' }}>
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
              {nextPage && (
                <InfinateScroll
                  nextPage={nextPage}
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  setNextPage={setNextPage}
                />
              )}
            </Grid>
          )}
        </Container>
      </main>
    </>
  );
}
