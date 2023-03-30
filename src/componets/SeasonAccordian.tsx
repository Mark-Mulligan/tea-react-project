// React
import React, { FC, useContext, useState } from 'react';

// Next
import Link from 'next/link';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';

// Context
import { AppContext } from '@/context/AppContext';

// Types
import { EpisodeOverview } from '@/customTypes/omdbApi';

interface IProps {
  title: string;
  seasonNumber: number;
  episodeData?: EpisodeOverview[]; // only used on first Accordian in list
}

const SeasonAccordian: FC<IProps> = ({ title, seasonNumber, episodeData }) => {
  const { darkMode } = useContext(AppContext);

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => (event: React.SyntheticEvent, isExpanded: boolean) => {
    console.log(event);
    console.log('isExapnded', isExpanded);
    setExpanded(!expanded);
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
        <Box sx={{ display: 'flex', overflow: 'auto', paddingBottom: '1.5rem' }}>
          {episodeData &&
            episodeData.map((episode) => {
              return (
                <Link
                  key={episode.imdbID}
                  href={`/movie/${episode.imdbID}`}
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
