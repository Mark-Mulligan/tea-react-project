// React
import { type FC, useContext } from 'react';

// Next
import Link from 'next/link';

// react-scroll
import { Element } from 'react-scroll';

// Mui
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';

// Context
import { AppContext } from '@/context/AppContext';

// Types
import { type OMDBMovieSearchData } from '../customTypes/omdbApi';

interface IProps {
  data: OMDBMovieSearchData;
}

const MediaCard: FC<IProps> = ({ data }) => {
  const { setSelectedMediaId } = useContext(AppContext);

  return (
    <Link href={`/media/${data.imdbID}`} passHref onClick={() => setSelectedMediaId(data.imdbID)} id={data.imdbID}>
      <Element name={data.imdbID} style={{ height: '100%' }}>
        <CardActionArea sx={{ height: '100%' }}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="140"
              image={data.Poster}
              alt={data.Title}
              sx={{ backgroundPositon: 'top' }}
            />
            <CardContent sx={{ marginBottom: '3rem' }}>
              <Typography gutterBottom variant="h5" component="div">
                {data.Title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '2rem' }}>
                {data.Type} - {data.Year}
              </Typography>

              <Chip label="View Details" variant="outlined" clickable />
            </CardContent>
          </Card>
        </CardActionArea>
      </Element>
    </Link>
  );
};

export default MediaCard;
