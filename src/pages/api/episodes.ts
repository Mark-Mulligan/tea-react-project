// Next
import type { NextApiRequest, NextApiResponse } from 'next';

// axios
import axios from 'axios';

// types
import { SeriesData } from '@/customTypes/omdbApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(401).json({ message: 'Invalid request.' });
    return;
  }

  if (req.method === 'GET') {
    if (req.query) {
      const url = new URL(process.env.OMDB_URL || '');

      if (req.query.i && typeof req.query.i === 'string') {
        url.searchParams.set('i', req.query.i);
      }

      if (req.query.Season && typeof req.query.Season === 'string') {
        url.searchParams.set('Season', req.query.Season);
      }

      if (url.search) {
        url.searchParams.set('apikey', process.env.OMDB_APIKEY || '');

        try {
          const { data } = await axios.get<SeriesData>(url.href);

          res.status(200).json(data);
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
