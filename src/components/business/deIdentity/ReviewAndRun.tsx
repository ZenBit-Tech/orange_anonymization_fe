import { Box, Button, Typography } from '@mui/material';
import type { FC } from 'react';

interface IProps {
  onReset: () => void;
}

const ReviewAndRun: FC<IProps> = ({ onReset }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography sx={{ mb: 2 }}>Всі кроки завершені!</Typography>
      <Button variant="contained" onClick={onReset}>
        Скинути
      </Button>
    </Box>
  );
};

export default ReviewAndRun;
