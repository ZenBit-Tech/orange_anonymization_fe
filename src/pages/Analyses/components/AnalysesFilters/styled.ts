import { Box, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';

import { BORDERS } from '@/theme';

const SEARCH_INPUT_MIN_WIDTH = 320;
const SEARCH_INPUT_MAX_WIDTH = 420;
const SEARCH_INPUT_HEIGHT = 36;

export const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  marginInline: theme.spacing(-4),
  paddingInline: theme.spacing(4),
  borderBottom: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,

  [theme.breakpoints.down('lg')]: {
    paddingBottom: theme.spacing(2),
    marginInline: theme.spacing(-2),
    paddingInline: theme.spacing(2),
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const FiltersRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flex: 1,

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}));

export const SearchInput = styled(TextField)(({ theme }) => ({
  minWidth: SEARCH_INPUT_MIN_WIDTH,
  maxWidth: SEARCH_INPUT_MAX_WIDTH,
  width: '100%',

  '& .MuiOutlinedInput-root': {
    height: SEARCH_INPUT_HEIGHT,
    borderRadius: theme.shape.sm,
    backgroundColor: theme.palette.common.white,

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary[500],
    },
  },

  '& .MuiInputBase-input': {
    ...theme.typography.bodyMd,
    color: theme.palette.neutral[700],
    padding: theme.spacing(1, 1.5),
  },
}));
