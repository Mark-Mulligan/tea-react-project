/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useRef, useState, type FC, type Dispatch, type SetStateAction } from 'react';

// Next
import { useRouter } from 'next/router';

// axios
import axios from 'axios';

// Types
import { OMDBMovieSearchData, type OMDBSearchResponse, type OMDBErrorResponse } from '../customTypes/omdbApi';

// Utils
import { createOMDBSearchURLObject } from '@/utils/api';

interface IProps {
  nextPage: string;
  setNextPage: Dispatch<SetStateAction<string>>;
  searchResults: OMDBMovieSearchData[];
  setSearchResults: Dispatch<SetStateAction<OMDBMovieSearchData[]>>;
}

const InfinateScroll: FC<IProps> = ({ nextPage, searchResults, setSearchResults, setNextPage }) => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0 || entries[0].intersectionRatio < 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    let nodeCopy = domRef.current;

    return () => {
      if (nodeCopy) {
        observer.unobserve(nodeCopy);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const getMovieSearch = async (searchString: string) => {
        try {
          const { data } = await axios.get<{ results: OMDBSearchResponse | OMDBErrorResponse; nextPage: string }>(
            `/api/movies/search${searchString}`,
          );

          // Handles error response from api.
          if (data.results.Response === 'False') {
            return;
          }

          setSearchResults([...searchResults, ...data.results.Search]);
          setNextPage(data.nextPage);
        } catch (err) {
          console.log(err);
        }
      };

      if (router.query) {
        const url = createOMDBSearchURLObject(router, 'router', nextPage);

        if (url.search) {
          getMovieSearch(url.search);
        }
      }
    }
  }, [isVisible]);

  return <div ref={domRef} />;
};

export default InfinateScroll;
