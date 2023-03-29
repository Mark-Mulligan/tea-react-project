// React
import { createContext, type Dispatch, type SetStateAction } from 'react';

interface DarkModeContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const defaultDarkmodeContext = {
  darkMode: true,
  setDarkMode: () => {},
};

export const DarkModeContext = createContext<DarkModeContext>(defaultDarkmodeContext);
