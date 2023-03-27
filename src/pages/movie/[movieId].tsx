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

// types
import { type MovieDetails } from '@/customTypes/omdbApi';

interface IProps {
  movieDetails: MovieDetails;
}

const MoviePage: NextPage<IProps> = ({ movieDetails }) => {
  const movieGenres = movieDetails.Genre.split(',');
  const movieWriters = movieDetails.Writer.split(',');
  const actors = movieDetails.Actors.split(',');
  const pageTitle = `${movieDetails.Title} (${movieDetails.Year})`;

  console.log(movieDetails);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <Paper>
            <Grid container>
              <Grid item md={4} sm={6} xs={12}>
                <img
                  alt={`${movieDetails.Title} box office poster`}
                  src={movieDetails.Poster}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Grid>
              <Grid item md={8} sm={6} xs={12} sx={{ padding: '1.5rem' }}>
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
                  <li>
                    <Typography variant="h6">Ratings</Typography>
                    {movieDetails.Ratings.map((rating) => {
                      return (
                        <Typography color="text.secondary" key={rating.Source}>
                          {rating.Source} - {rating.Value}
                        </Typography>
                      );
                    })}
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const movieId = context?.params?.movieId;

  if (typeof movieId !== 'string') {
    return {
      props: {
        movieDetails: null,
      }, // will be passed to the page component as props
    };
  }

  try {
    const { data } = await axios.get<MovieDetails>(
      `${process.env.OMDB_URL}?i=${movieId}&plot=full&apikey=${process.env.OMDB_APIKEY}`,
    );

    return {
      props: {
        movieDetails: data,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      props: {
        movieDetails: {},
      }, // will be passed to the page component as props
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
