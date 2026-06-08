import { Box, Pagination, styled } from '@mui/material';

const PAGINATION_SIZE = 40;

export const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPagination-ul': {
    gap: theme.spacing(0.75),
    flexWrap: 'nowrap',
    alignItems: 'center',
  },

  '& .MuiPaginationItem-root': {
    ...theme.typography.labelMd,
    minWidth: PAGINATION_SIZE,
    height: PAGINATION_SIZE,
    margin: 0,
    borderRadius: '50%',
    color: theme.palette.neutral[900],
    transition: 'all 0.2s ease',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      backgroundColor: theme.palette.primary[50],
    },
  },

  '& .MuiPaginationItem-ellipsis': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: PAGINATION_SIZE,
    lineHeight: 1,
  },

  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: theme.palette.primary[50],
    color: theme.palette.neutral[900],

    '&:hover': {
      backgroundColor: theme.palette.primary[50],
    },
  },

  '& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast': {
    color: theme.palette.neutral[900],
  },

  '& .Mui-disabled': {
    opacity: 0.4,
  },
}));
