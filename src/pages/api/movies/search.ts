// Next
import type { NextApiRequest, NextApiResponse } from 'next';

// axios
import axios from 'axios';

// types
import { OMDBSearchResponse } from '@/customTypes/omdbApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(401).json({ message: 'Invalid request.' });
    return;
  }

  if (req.method === 'GET') {
    if (req.query) {
      const url = new URL(process.env.OMDB_URL || '');

      if (req.query.q && typeof req.query.q === 'string') {
        url.searchParams.set('s', req.query.q);
      }

      if (req.query.type && typeof req.query.type === 'string') {
        url.searchParams.set('type', req.query.type);
      }

      if (req.query.y && typeof req.query.y === 'string') {
        url.searchParams.set('y', req.query.y);
      }

      if (url.search) {
        url.searchParams.set('apikey', process.env.OMDB_APIKEY || '');

        console.log(url.href);

        try {
          const { data } = await axios.get<OMDBSearchResponse>(url.href);
          res.status(200).json(data);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Unabled to search movies' });
        }
      }

      return;
    }

    res.status(401).json({ message: 'Invalid request.' });
  }
}
