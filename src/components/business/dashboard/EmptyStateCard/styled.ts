import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BORDERS } from '@/theme';
import { CARD_GRID_ROW_SPAN, EMPTY_BODY_GAP, EMPTY_BODY_PADDING_Y } from './EmptyStateCard.const';

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'subgrid',
  gridRow: `span ${CARD_GRID_ROW_SPAN}`,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.lg,
  boxShadow: theme.customShadows.sm,
}));

export const Title = styled('div')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.neutral[900],
  marginBottom: theme.spacing(0.5),
}));

export const Subtitle = styled('div')(({ theme }) => ({
  ...theme.typography.labelSm,
  color: theme.palette.neutral[500],
}));

export const SectionDivider = styled(Box)(({ theme }) => ({
  height: BORDERS.divider,
  borderRadius: BORDERS.dividerRadius,
  backgroundColor: theme.palette.neutral[200],
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

export const EmptyBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(EMPTY_BODY_PADDING_Y, 0),
  gap: theme.spacing(EMPTY_BODY_GAP),
}));

export const EmptyLabel = styled('div')(({ theme }) => ({
  ...theme.typography.labelSm,
  color: theme.palette.neutral[900],
}));
