import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { BORDERS, LAYOUT } from '@/theme';

export const CardWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden ',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.sm,
  padding: theme.spacing(2.5),
  gap: theme.spacing(2),
  boxShadow: theme.customShadows.sm,
  border: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
}));

export const TopBar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: LAYOUT.topBar.offset,
  height: LAYOUT.topBar.height,
  left: theme.spacing(2.5),
  right: theme.spacing(2.5),
  borderRadius: theme.shape.xs,
  backgroundColor: theme.palette.primary[500],
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: LAYOUT.icon.md,
  height: LAYOUT.icon.md,
  borderRadius: theme.radius.circle,
  backgroundColor: theme.palette.neutral[100],
  flexShrink: 0,
}));

export const Label = styled('div')(({ theme }) => ({
  ...theme.typography.labelSm,
  color: theme.palette.neutral[500],
  marginBottom: theme.spacing(0.5),
}));

export const Value = styled('div')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.neutral[900],
}));
