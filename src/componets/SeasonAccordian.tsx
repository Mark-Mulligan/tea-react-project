// React
import React, { FC, useContext, useState } from 'react';

// Next
import Link from 'next/link';

// axios
import axios from 'axios';

// MUI
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Context
import { AppContext } from '@/context/AppContext';

// Types
import { EpisodeOverview, SeriesData } from '@/customTypes/omdbApi';

interface IProps {
  title: string;
  seasonNumber: number;
  seriesId: string;
  episodeData?: EpisodeOverview[]; // only used on first Accordian in list
}

const SeasonAccordian: FC<IProps> = ({ title, seasonNumber, seriesId, episodeData }) => {
  const { darkMode } = useContext(AppContext);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [episodes, setEpisodes] = useState<EpisodeOverview[]>([]);
  const [hasFetchedData, setHasFetchedData] = useState(episodeData ? true : false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => async (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(!expanded);

    if (!hasFetchedData) {
      setIsLoading(true);

      try {
        const { data } = await axios.get<SeriesData>(`/api/episodes?i=${seriesId}&Season=${seasonNumber}`);
        if (data.Episodes) {
          setHasFetchedData(true);
          setEpisodes(data.Episodes);
        }
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    }
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange()}
      sx={{ background: darkMode ? 'rgba(14, 24, 37)' : 'rgba(210, 210, 210)', overflow: 'hidden' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingRight: '1rem' }}>
        {isLoading && (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress size={80} />
          </Box>
        )}
        <Box sx={{ display: 'flex', overflow: 'auto', paddingBottom: '1.5rem' }}>
          {episodeData &&
            episodeData.map((episode) => {
              return (
                <Link
                  key={episode.imdbID}
                  href={`/media/${episode.imdbID}`}
                  passHref
                  id={episode.imdbID}
                  style={{ marginRight: '1rem' }}
                >
                  <CardActionArea sx={{ height: '100%', minWidth: '220px' }}>
                    <Card sx={{ height: '100%', background: darkMode ? 'rgba(8, 12, 33)' : 'rgb(190, 190, 190)' }}>
                      <CardContent sx={{ marginBottom: '3rem' }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {episode.Title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Episode: {episode.Episode}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '2rem' }}>
                          Released: {episode.Released}
                        </Typography>

                        <Chip label="View Details" variant="outlined" clickable />
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Link>
              );
            })}
          {episodes.map((episode) => {
            return (
              <Link
                key={episode.imdbID}
                href={`/media/${episode.imdbID}`}
                passHref
                id={episode.imdbID}
                style={{ marginRight: '1rem' }}
              >
                <CardActionArea sx={{ height: '100%', minWidth: '220px' }}>
                  <Card sx={{ height: '100%', background: darkMode ? 'rgba(8, 12, 33)' : 'rgb(190, 190, 190)' }}>
                    <CardContent sx={{ marginBottom: '3rem' }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {episode.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Episode: {episode.Episode}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '2rem' }}>
                        Released: {episode.Released}
                      </Typography>

                      <Chip label="View Details" variant="outlined" clickable />
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SeasonAccordian;
