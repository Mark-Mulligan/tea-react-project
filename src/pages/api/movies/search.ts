// Next
import type { NextApiRequest, NextApiResponse } from 'next';

// axios
import axios from 'axios';

// types
import { OMDBSearchResponse } from '@/customTypes/omdbApi';

// utils
import { createOMDBSearchURLObject } from '@/utils/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(401).json({ message: 'Invalid request.' });
    return;
  }

  if (req.method === 'GET') {
    if (req.query) {
      const url = createOMDBSearchURLObject(req, 'req');

      if (url.search) {
        url.searchParams.set('apikey', process.env.OMDB_APIKEY || '');

        try {
          const { data } = await axios.get<OMDBSearchResponse>(url.href);
          const currentPage = Number(req.query.page);
          const totalResults = Number(data.totalResults);
          let nextPage = '';

          if (currentPage * 10 < totalResults) {
            nextPage = (currentPage + 1).toString();
          }

          res.status(200).json({ results: data, nextPage });
          return;
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Unabled to search movies' });
          return;
        }
      }

      res.status(401).json({ message: 'Request missing search params' });
      return;
    }

    res.status(401).json({ message: 'Invalid request.' });
  }
}
