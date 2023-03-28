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
  Response: 'True' | 'False';
  Error: string;
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
  Response: 'True' | 'False';
}
