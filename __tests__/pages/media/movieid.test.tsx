// React
import React from 'react';

// Testing Library
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Application
import MoviePage from '../../../src/pages/media/[movieId]';

const exampleMovieDetails = {
  Title: 'Batman Begins',
  Year: '2005',
  Rated: 'PG-13',
  Released: '15 Jun 2005',
  Runtime: '140 min',
  Genre: 'Action, Crime, Drama',
  Director: 'Christopher Nolan',
  Writer: 'Bob Kane, David S. Goyer, Christopher Nolan',
  Actors: 'Christian Bale, Michael Caine, Ken Watanabe',
  Plot: `When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia, where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as "Batman". But it doesn't stay quiet for long.`,
  Language: 'English, Mandarin',
  Country: 'United States, United Kingdom',
  Awards: 'Nominated for 1 Oscar. 14 wins & 79 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.2/10' },
    { Source: 'Rotten Tomatoes', Value: '84%' },
    { Source: 'Metacritic', Value: '70/100' },
  ],
  Metascore: '70',
  imdbRating: '8.2',
  imdbVotes: '1,489,724',
  imdbID: 'tt0372784',
  Type: 'movie' as 'movie' | 'series' | 'episode',
  DVD: '18 Oct 2005',
  BoxOffice: '$206,863,479',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True' as 'True',
};

describe('Movie Id Page Data Tests', () => {
  it('renders the movie title', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const heading = screen.getByText('Batman Begins');
    expect(heading).toBeInTheDocument();
  });
  it('renders the movie rating', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const rating = screen.getByText('PG-13', { exact: false });
    expect(rating).toBeInTheDocument();
  });
  it('renders the movie runtime length', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const runtime = screen.getByText('140 min', { exact: false });
    expect(runtime).toBeInTheDocument();
  });
  it('renders the movie plot', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const plot = screen.getByText(exampleMovieDetails.Plot);
    expect(plot).toBeInTheDocument();
  });
  it('renders the movie director (who is also a writer so appears twice)', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const nolanReferences = screen.getAllByText('Christopher Nolan');
    expect(nolanReferences.length).toBe(2);
  });
  it('renders the movie writer(s)', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const writer1 = screen.getByText('Bob Kane', { exact: false });
    const writer2 = screen.getByText('David S. Goyer', { exact: false });

    expect(writer1).toBeInTheDocument();
    expect(writer2).toBeInTheDocument();
  });
  it('renders the movie actors', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const actor1 = screen.getByText('Christian Bale', { exact: false });
    const actor2 = screen.getByText('Michael Caine', { exact: false });
    const actor3 = screen.getByText('Ken Watanabe', { exact: false });

    expect(actor1).toBeInTheDocument();
    expect(actor2).toBeInTheDocument();
    expect(actor3).toBeInTheDocument();
  });

  it('renders the movie ratings', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const rating1 = screen.getByText(exampleMovieDetails.Ratings[0].Value, { exact: false });
    const rating2 = screen.getByText(exampleMovieDetails.Ratings[1].Value, { exact: false });
    const rating3 = screen.getByText(exampleMovieDetails.Ratings[2].Value, { exact: false });

    expect(rating1).toBeInTheDocument();
    expect(rating2).toBeInTheDocument();
    expect(rating3).toBeInTheDocument();
  });

  it('renders the box office amount', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const boxOffice = screen.getByText(exampleMovieDetails.BoxOffice);
    expect(boxOffice).toBeInTheDocument();
  });

  it('renders the Location of the movie', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const country = screen.getByText(exampleMovieDetails.Country);
    expect(country).toBeInTheDocument();
  });

  it('renders the awards for a movie', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const awards = screen.getByText(exampleMovieDetails.Awards);
    expect(awards).toBeInTheDocument();
  });

  it('renders the release date of the movie', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    // The release date is formatted from the original provided;
    const releaseDate = screen.getByText('June 15, 2005');
    expect(releaseDate).toBeInTheDocument();
  });

  it('renders the type of media', () => {
    render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
    const mediaType = screen.getByText(exampleMovieDetails.Type);
    expect(mediaType).toBeInTheDocument();
  });
});
