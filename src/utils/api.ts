// Next
import { type NextApiRequest } from 'next';
import { type NextRouter } from 'next/router';

export const createOMDBSearchURLObject = (
  reqOrRouter: NextApiRequest | NextRouter,
  inputType: 'req' | 'router',
  nextPage?: string,
) => {
  /**
   *  There is similar logic in the frontend and backend to use the url object, the only difference is that the front end
   * is using a next router and the backend is using a Next request Object.  The base URL for these cases is diffferent.
   * */
  const url =
    inputType === 'router'
      ? new URL('/api/movies/search', process.env.NEXT_PUBLIC_BASE_URL)
      : new URL(process.env.OMDB_URL || '');

  if (reqOrRouter.query.s && typeof reqOrRouter.query.s === 'string') {
    url.searchParams.set('s', reqOrRouter.query.s);
  }

  if (reqOrRouter.query.type && typeof reqOrRouter.query.type === 'string') {
    url.searchParams.set('type', reqOrRouter.query.type);
  }

  if (reqOrRouter.query.y && typeof reqOrRouter.query.y === 'string') {
    url.searchParams.set('y', reqOrRouter.query.y);
  }

  if (reqOrRouter.query.page && typeof reqOrRouter.query.page === 'string') {
    url.searchParams.set('page', nextPage || reqOrRouter.query.page);
  }

  return url;
};
