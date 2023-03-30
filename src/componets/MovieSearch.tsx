// React
import { useState, useEffect, type FormEvent, type FC, type Dispatch, type SetStateAction } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

// utils
import { yearSelectOptions } from '../utils/mediaSearch';

// Types
import { type OMDBMovieSearchData } from '../customTypes/omdbApi';

interface IProps {
  setSearchResultCount: Dispatch<SetStateAction<number>>;
  setSearchResults: Dispatch<SetStateAction<OMDBMovieSearchData[]>>;
}

const MovieSearch: FC<IProps> = ({ setSearchResultCount, setSearchResults }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState((router?.query?.q as string) || '');
  const [mediaType, setMediaType] = useState((router?.query?.type as string) || 'any');
  const [releaseYear, setReleaseYear] = useState<string | null>(null);

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

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (searchText || mediaType !== 'any' || releaseYear) {
      const queryObject: { s?: string; type?: string; y?: string; page: string } = { page: '1' };

      if (searchText) {
        // Fixes issue where searches fail with a space at the end.
        queryObject.s = searchText.trim();
        setSearchText(searchText.trim());
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

  /**
   * Used to ensure that the search inputs match the query string. This is need on page reloads or when hitting the back
   * button after navigating to an individual media page.
   */
  useEffect(() => {
    if (router.query.s && typeof router.query.s === 'string') {
      setSearchText(router.query.s);
    }

    if (router.query.type && typeof router.query.type === 'string') {
      setMediaType(router.query.type);
    }

    if (router.query.y && typeof router.query.y === 'string') {
      setReleaseYear(router.query.y);
    }
  }, [router.query]);

  return (
    <Box component="form" onSubmit={handleSearchSubmit}>
      <Grid container spacing={4} sx={{ marginBottom: '1.5rem' }}>
        <Grid item md={4} xs={12}>
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
              <MenuItem value="game">Game</MenuItem>
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

      <Grid container spacing={4} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button variant="outlined" onClick={resetSearch}>
            Clear Search
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieSearch;
