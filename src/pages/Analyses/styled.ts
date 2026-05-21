import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { BORDERS } from '@/theme';

export const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[50],
}));

export const AnalysesCard = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  borderRadius: theme.shape.lg,
  border: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
  boxShadow: theme.customShadows.sm,
  backgroundColor: theme.palette.common.white,
}));
