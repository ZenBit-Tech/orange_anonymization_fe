import { Box, MenuItem, Select, styled } from '@mui/material';

import { BORDERS } from '@/theme';

const FILTER_SELECT_SIZES = {
  minWidth: 180,
  height: 36,
} as const;

export const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(4),
  marginInline: theme.spacing(-4),
  paddingInline: theme.spacing(4),
  borderBottom: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,

  [theme.breakpoints.down('lg')]: {
    paddingBottom: theme.spacing(2),
    marginInline: theme.spacing(-2),
    paddingInline: theme.spacing(2),
  },
}));

export const FiltersRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const FilterSelect = styled(Select<string>)(({ theme }) => ({
  ...theme.typography.bodyMd,
  minWidth: FILTER_SELECT_SIZES.minWidth,
  height: FILTER_SELECT_SIZES.height,
  borderRadius: theme.shape.sm,
  color: theme.palette.neutral[700],

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary[500],
  },

  '& .MuiSelect-select': {
    padding: theme.spacing(0.75, 1.5),
  },
}));

export const FilterMenuItem = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.bodyMd,
  color: theme.palette.neutral[900],

  padding: theme.spacing(1, 1.5),

  '&:hover': {
    backgroundColor: theme.palette.neutral[50],
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.primary[50],
    color: theme.palette.primary[500],
  },

  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.primary[100],
  },
}));
