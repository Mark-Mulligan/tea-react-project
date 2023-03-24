// Next
import type { NextApiRequest, NextApiResponse } from 'next';

// axios
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(401).json({ message: 'Invalid request.' });
    return;
  }

  if (req.method === 'GET') {
    if (req.query && req.query.q && typeof req.query.q === 'string') {
      const searchStr = req.query.q;
      try {
        const { data } = await axios.get(`${process.env.OMDB_URL}?t=${searchStr}}&apikey=${process.env.OMDB_APIKEY}`);
        console.log(data);
        res.status(200).json(req.query.q);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unabled to search movies' });
      }
      return;
    }

    res.status(401).json({ message: 'Invalid request.' });
  }
}
