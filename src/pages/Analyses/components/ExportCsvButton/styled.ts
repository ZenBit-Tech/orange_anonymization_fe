import { Box, styled } from '@mui/material';

const ICON_SIZE = 24;

export const ExportButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1.5),
  color: theme.palette.primary.main,
  transition: 'opacity 0.2s ease',

  '&:hover': {
    opacity: 0.7,
  },

  '& svg': {
    width: ICON_SIZE,
    height: ICON_SIZE,
    color: theme.palette.accent[400],
  },
}));

export const ExportButtonText = styled(Box)(({ theme }) => ({
  ...theme.typography.labelMd,
  color: theme.palette.accent[400],
}));
