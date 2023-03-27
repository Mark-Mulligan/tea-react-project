// React
import { type FC } from 'react';

// Mui
import Typography from '@mui/material/Typography';

interface IProps {
  listItems: string[];
}

const DotList: FC<IProps> = ({ listItems }) => {
  return (
    <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
      {listItems.map((item, index) => {
        if (index < listItems.length - 1) {
          return (
            <span key={item}>
              {item} <sup>.</sup>
            </span>
          );
        }
        return <span key={item}>{item}</span>;
      })}
    </Typography>
  );
};

export default DotList;
