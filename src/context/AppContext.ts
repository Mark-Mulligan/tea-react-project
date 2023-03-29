// React
import { createContext, type Dispatch, type SetStateAction } from 'react';

// Types
import { type OMDBMovieSearchData } from '@/customTypes/omdbApi';

interface AppContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  searchResults: OMDBMovieSearchData[];
  setSearchResults: Dispatch<SetStateAction<OMDBMovieSearchData[]>>;
  nextPage: string;
  setNextPage: Dispatch<SetStateAction<string>>;
  selectedMediaId: string;
  setSelectedMediaId: Dispatch<SetStateAction<string>>;
  searchResultCount: number;
  setSearchResultCount: Dispatch<SetStateAction<number>>;
  previousSearchString: string;
  setPreviousSearchString: Dispatch<SetStateAction<string>>;
}

const defaultAppContext = {
  darkMode: true,
  setDarkMode: () => {},
  searchResults: [],
  setSearchResults: () => {},
  nextPage: '',
  setNextPage: () => {},
  selectedMediaId: '',
  setSelectedMediaId: () => {},
  searchResultCount: 0,
  setSearchResultCount: () => {},
  previousSearchString: '',
  setPreviousSearchString: () => {},
};

export const AppContext = createContext<AppContext>(defaultAppContext);
