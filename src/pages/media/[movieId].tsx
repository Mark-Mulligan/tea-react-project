/* eslint-disable @next/next/no-img-element */
// Next images won't work well since external urls need to be provided.  I don't want to provide every possible external url for this project

// Next
import { type NextPage, type GetStaticProps } from 'next';
import Head from 'next/head';

// axios
import axios from 'axios';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// components
import DotList from '../../componets/DotList';
import SeasonAccordian from '@/componets/SeasonAccordian';

// types
import { type MovieDetails, type OMDBErrorResponse, type SeriesData } from '@/customTypes/omdbApi';

// utils
import { formatDate } from '../../utils/movieIdPage';

interface IProps {
  movieDetails: MovieDetails;
  seriesData: SeriesData | null;
}

const MoviePage: NextPage<IProps> = ({ movieDetails, seriesData }) => {
  // Needed to added the ? marks to handle 404 cases where the movieDetails are not found
  const movieGenres = movieDetails?.Genre?.split(',') || [];
  const movieWriters = movieDetails?.Writer?.split(',') || [];
  const actors = movieDetails?.Actors?.split(',') || [];
  const pageTitle = movieDetails ? `${movieDetails.Title} (${movieDetails.Year})` : '';

  if (!movieDetails) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={movieDetails.Plot} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
        <meta name="title" property="og:title" content={pageTitle} />
        <meta name="image" property="og:image" content={movieDetails.Poster} />
        <meta name="description" property="og:description" content={movieDetails.Plot} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Typography variant="h1" align="center" sx={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            {movieDetails.Title}
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ marginBottom: '1.5rem' }}>
            {movieDetails.Year} <sup>.</sup> {movieDetails.Rated} <sup>.</sup> {movieDetails.Runtime}
          </Typography>
          <Paper sx={{ marginBottom: '2rem' }}>
            <Grid container>
              <Grid item md={4} sm={5} xs={12} alignItems="center">
                <img
                  alt={`${movieDetails.Title} box office poster`}
                  src={movieDetails.Poster}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Grid>

              <Grid item md={8} sm={7} xs={12} sx={{ padding: '1.5rem' }}>
                <ul>
                  <li>
                    <Typography variant="h6">Plot</Typography>
                    <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                      {movieDetails.Plot}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h6">Director</Typography>
                    <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                      {movieDetails.Director}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h6">Writers</Typography>
                    <DotList listItems={movieWriters} />
                  </li>
                  <li>
                    <Typography variant="h6">Actors</Typography>
                    <DotList listItems={actors} />
                  </li>
                  <li>
                    <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                      Genre
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ marginBottom: '1rem' }}>
                      {movieGenres.map((genre) => {
                        return <Chip label={genre} variant="outlined" key={genre} />;
                      })}
                    </Stack>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <Typography variant="h2" textAlign="center" sx={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>
              Additional Info
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={5} sm={6} xs={12}>
                <Typography variant="h6">Ratings</Typography>
                {movieDetails.Ratings.map((rating) => {
                  return (
                    <Typography color="text.secondary" key={rating.Source}>
                      {rating.Source} - {rating.Value}
                    </Typography>
                  );
                })}
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Typography variant="h6">Box Office</Typography>
                <Typography color="text.secondary">{movieDetails.BoxOffice || 'N/A'}</Typography>
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h6">Location</Typography>
                <Typography color="text.secondary">{movieDetails.Country}</Typography>
              </Grid>
              <Grid item md={5} sm={6} xs={12}>
                <Typography variant="h6">Awards</Typography>
                <Typography color="text.secondary">{movieDetails.Awards}</Typography>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Typography variant="h6">Release Date</Typography>
                <Typography color="text.secondary">{formatDate(movieDetails.Released)}</Typography>
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h6">Media Type</Typography>
                <Typography color="text.secondary">{movieDetails.Type}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {seriesData && (
            <Paper sx={{ padding: '1.5rem' }}>
              <Typography variant="h2" textAlign="center" sx={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>
                Seasons
              </Typography>
              {Array(Number(seriesData?.totalSeasons))
                .fill(0)
                .map((item, index) => {
                  if (index === 0) {
                    return (
                      <SeasonAccordian
                        key={`seasion-accordian-${index}`}
                        title={`Season ${index + 1}`}
                        seasonNumber={index + 1}
                        episodeData={seriesData.Episodes}
                        seriesId={movieDetails.imdbID}
                      />
                    );
                  }

                  return (
                    <SeasonAccordian
                      key={`seasion-accordian-${index}`}
                      title={`Season ${index + 1}`}
                      seasonNumber={index + 1}
                      seriesId={movieDetails.imdbID}
                    />
                  );
                })}
            </Paper>
          )}
        </Container>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const movieId = context?.params?.movieId;

  if (typeof movieId !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const { data } = await axios.get<MovieDetails | OMDBErrorResponse>(
      `${process.env.OMDB_URL}?i=${movieId}&plot=full&apikey=${process.env.OMDB_APIKEY}`,
    );

    if (data.Response === 'False') {
      return {
        notFound: true,
      };
    }

    let seriesData: SeriesData | null = null;

    if (data.Type === 'series') {
      const { data } = await axios.get<SeriesData | OMDBErrorResponse>(
        `${process.env.OMDB_URL}?i=${movieId}&Season=1&apikey=${process.env.OMDB_APIKEY}`,
      );

      if (data.Response === 'True') {
        seriesData = data;
      }
    }

    return {
      props: {
        mediaType: data.Type,
        movieDetails: data,
        seriesData,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default MoviePage;
