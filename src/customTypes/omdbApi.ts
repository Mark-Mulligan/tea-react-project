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
}
