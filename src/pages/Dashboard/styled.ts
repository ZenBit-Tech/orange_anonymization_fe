import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { BORDERS } from '@/theme';

import { CHART_CONSTANTS } from './components/ActivityChart/constants';

export const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[50],
}));

export const WelcomeBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.lightest,
  border: `${BORDERS.card}px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.sm,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  boxShadow: theme.customShadows.sm,
}));

export const WelcomeText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}));

export const WelcomeTitle = styled('div')(({ theme }) => ({
  ...theme.typography.labelMd,
  color: theme.palette.neutral[900],
}));

export const WelcomeSubtitle = styled('div')(({ theme }) => ({
  ...theme.typography.labelSm,
  marginTop: theme.spacing(1),
  color: theme.palette.neutral[700],
}));

export const NewAnalysisButton = styled(Button)(({ theme }) => ({
  ...theme.typography.labelMd,
  gap: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary[500],

  '&:hover': {
    backgroundColor: theme.palette.primary[400],
  },
}));

export const MetricsRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.lg,
  padding: theme.spacing(2),
  boxShadow: theme.customShadows.sm,
}));

export const ChartHeaderRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const SectionTitle = styled('h2')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.neutral[900],
  marginBottom: theme.spacing(0.5),
}));

export const SectionSubtitle = styled('p')(({ theme }) => ({
  ...theme.typography.labelSm,
  color: theme.palette.neutral[500],
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  ...theme.typography.labelMd,
  textTransform: 'none',
  color: theme.palette.accent[400],
  minWidth: 'auto',
  padding: 0,

  '&:hover': {
    color: theme.palette.accent[200],
  },
}));

export const SectionDivider = styled(Box)(({ theme }) => ({
  height: BORDERS.divider,
  borderRadius: BORDERS.dividerRadius,
  backgroundColor: theme.palette.neutral[200],
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

export const BottomGrid = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'auto auto auto',
  columnGap: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(2),
  },
}));

export const RecentActivityCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3, 0),
  borderRadius: theme.shape.lg,
  border: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
  boxShadow: theme.customShadows.sm,
  backgroundColor: theme.palette.common.white,
}));

export const ChartLoaderWrapper = styled(Box)(({ theme }) => ({
  height: CHART_CONSTANTS.CHART_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary[500],
}));
