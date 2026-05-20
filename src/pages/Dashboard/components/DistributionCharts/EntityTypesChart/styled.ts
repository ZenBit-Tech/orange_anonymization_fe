import { Box, Button, styled } from '@mui/material';

import { CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

const SHOW_MORE_ICON_MARGIN = 8;
const SHOW_MORE_MARGIN_TOP = 35;

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const ShowMoreContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: SHOW_MORE_MARGIN_TOP,
});

export const ShowMoreButton = styled(Button)(({ theme }) => ({
  ...theme.typography.bodyMd,
  padding: 0,
  minWidth: 'unset',
  color: theme.palette.accent.main,
  textTransform: 'none',

  '&:hover': {
    background: 'transparent',
  },

  '& .MuiButton-endIcon': {
    marginLeft: SHOW_MORE_ICON_MARGIN,
  },

  '& svg': {
    fontSize: theme.typography.bodyMd.fontSize,
  },
}));

export const StyledCartesianGrid = styled(CartesianGrid)({});
export const StyledXAxis = styled(XAxis)({});
export const StyledYAxis = styled(YAxis)({});
export const StyledBar = styled(Bar)({});
