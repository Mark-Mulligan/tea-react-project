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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Types
import { type OMDBSearchResponse, type OMDBMovieSearchData } from '../customTypes/omdbApi';

// Components
import InfinateScroll from '@/componets/InfinateScroll';
import MediaCard from '@/componets/MediaCard';

// utils
import { yearSelectOptions } from '../utils/mediaSearch';

export default function Home() {
  const router = useRouter();

  const [searchText, setSearchText] = useState((router?.query?.q as string) || '');
  const [mediaType, setMediaType] = useState((router?.query?.type as string) || 'any');
  const [releaseYear, setReleaseYear] = useState<string | null>(null);
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [nextPage, setNextPage] = useState('');
  const [noResultsText, setNoResultsText] = useState('');
  const [searchResults, setSearchResults] = useState<OMDBMovieSearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resetSearch = async () => {
    setSearchText('');
    setMediaType('any');
    setReleaseYear(null);
    setSearchResultCount(0);
    setSearchResults([]);
    await router.push({ pathname: '/', query: {} }, undefined);
  };

  const handleMediaTypeChange = (event: SelectChangeEvent) => {
    setMediaType(event.target.value);
  };

  const setDefaultValuesOnQuery = () => {
    if (router.query.q && typeof router.query.q === 'string') {
      setSearchText(router.query.q);
    }

    if (router.query.type && typeof router.query.type === 'string') {
      setMediaType(router.query.type);
    }

    if (router.query.y && typeof router.query.y === 'string') {
      setReleaseYear(router.query.y);
    }
  };

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (searchText || mediaType !== 'any' || releaseYear) {
      const queryObject: { q?: string; type?: string; y?: string; page: string } = { page: '1' };

      if (searchText) {
        queryObject.q = searchText;
      }

      if (mediaType && mediaType !== 'any') {
        queryObject.type = mediaType;
      }

      if (releaseYear) {
        queryObject.y = releaseYear;
      }

      await router.push({ pathname: '/', query: queryObject }, undefined);
    }
  };

  useEffect(() => {
    const getMovieSearch = async (searchString: string) => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<{ results: OMDBSearchResponse; nextPage: string }>(
          `/api/movies/search${searchString}`,
        );

        // This is for when no results are returned in a users search.
        if (data.results.Response === 'False') {
          setSearchResults([]);
          setSearchResultCount(0);
          setNextPage('');
          setNoResultsText(data.results.Error);
          console.log('this ran');
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

    setDefaultValuesOnQuery();

    if (router.query) {
      let url = new URL('/api/movies/search', process.env.NEXT_PUBLIC_BASE_URL);

      if (router.query.q && typeof router.query.q === 'string') {
        url.searchParams.set('q', router.query.q);
      }

      if (router.query.type && typeof router.query.type === 'string') {
        url.searchParams.set('type', router.query.type);
      }

      if (router.query.y && typeof router.query.y === 'string') {
        url.searchParams.set('y', router.query.y);
      }

      if (router.query.page && typeof router.query.page === 'string') {
        url.searchParams.set('page', router.query.page);
      }

      if (url.search) {
        getMovieSearch(url.search);
      }
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>OMDB - Online Movie Database</title>
        <meta name="description" content="Search for movies, tv-shows, series and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ paddingTop: '2em', paddingBottom: '2rem' }}>
          <Typography variant="h1" align="center" sx={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Search Movies
          </Typography>
          <Box component="form" onSubmit={handleSearchSubmit}>
            <Grid container spacing={4}>
              <Grid item md={4} sm={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  label="Search Titles"
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="media-type-select-label">Media Type</InputLabel>
                  <Select
                    labelId="media-type-select-label"
                    id="media-type-select"
                    value={mediaType}
                    label="Media Type"
                    onChange={handleMediaTypeChange}
                  >
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="movie">Movie</MenuItem>
                    <MenuItem value="series">Series</MenuItem>
                    <MenuItem value="episode">Episode</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <Autocomplete
                  id="yearSelect"
                  fullWidth
                  options={yearSelectOptions()}
                  value={releaseYear}
                  onChange={(event: any, newValue: string | null) => {
                    setReleaseYear(newValue);
                  }}
                  autoHighlight
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField {...params} label="Year" />}
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1.5rem' }}>
              <Button variant="outlined" sx={{ marginRight: '1rem' }} onClick={resetSearch}>
                Clear Search
              </Button>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Box>
          </Box>
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
