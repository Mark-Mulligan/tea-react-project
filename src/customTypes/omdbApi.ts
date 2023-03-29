export interface OMDBMovieSearchData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface OMDBSearchResponse {
  Search: OMDBMovieSearchData[];
  totalResults: string; // number as a string;
  Response: 'True';
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Runtime: string; // 140 min
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  DVD: string;
  BoxOffice: string; // $206,863,479
  Production: string; // N/A
  Website: string; // N/A
  Response: 'True';
}

export interface EpisodeOverview {
  Title: string;
  Released: string; // ex 2011-04-17;
  Episode: string; // ex 1;
  imdbRating: string;
  imdbId: string;
}

export interface SeriesData {
  Title: string;
  Season: string;
  totalSeasons: string;
  Episodes: EpisodeOverview[];
  Response: 'True';
}

export interface OMDBErrorResponse {
  Response: 'False';
  Error: string;
}
