// React
import { useEffect, useRef, useState, type FC, type Dispatch, type SetStateAction } from 'react';

// Next
import { useRouter } from 'next/router';

// axios
import axios from 'axios';

// Types
import { OMDBMovieSearchData, type OMDBSearchResponse } from '../customTypes/omdbApi';

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

        // This removes the event listener
        // if (domRef.current) {
        //   observer.unobserve(domRef.current);
        // }
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
          const { data } = await axios.get<{ results: OMDBSearchResponse; nextPage: string }>(
            `/api/movies/search${searchString}`,
          );
          setSearchResults([...searchResults, ...data.results.Search]);
          setNextPage(data.nextPage);
        } catch (err) {
          console.log(err);
        }
      };

      if (router.query) {
        let url = new URL('/api/movies/search', process.env.NEXT_PUBLIC_BASE_URL);

        if (router.query.q && typeof router.query.q === 'string') {
          url.searchParams.set('q', router.query.q);
        }

        if (router.query.type && typeof router.query.type === 'string') {
          url.searchParams.set('type', router.query.type);
        }

        if (router.query.y && typeof router.query.y === 'string') {
          url.searchParams.set('y', router.query.y);
        }

        if (router.query.page && typeof router.query.page === 'string') {
          url.searchParams.set('page', nextPage);
        }

        if (url.search) {
          getMovieSearch(url.search);
        }
      }
    }
    console.log('isVisible', isVisible);
  }, [isVisible]);

  return <div ref={domRef} />;
};

export default InfinateScroll;
