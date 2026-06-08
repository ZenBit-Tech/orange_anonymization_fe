import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChartWrapper = styled(Box)(() => ({
  width: '100%',
}));

export const TickStyles = styled('span')(({ theme }) => ({
  ...theme.typography.labelSm,
  color: theme.palette.neutral[500],
}));
