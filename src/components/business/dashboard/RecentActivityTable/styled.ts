import { Box, Table, TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BORDERS } from '@/theme';
import {
  EMPTY_CELL_HEIGHT,
  TABLE_MIN_WIDTH_SPACING,
  TABLE_WRAPPER_MARGIN_X,
} from './RecentActivityTable.const';

export const TableWrapper = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  marginLeft: theme.spacing(TABLE_WRAPPER_MARGIN_X),
  marginRight: theme.spacing(TABLE_WRAPPER_MARGIN_X),
  marginTop: theme.spacing(2),
  WebkitOverflowScrolling: 'touch',
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: theme.spacing(TABLE_MIN_WIDTH_SPACING),
  borderCollapse: 'collapse',
}));

export const HeadCell = styled(TableCell)(({ theme }) => ({
  ...theme.typography.bodyMd,
  color: theme.palette.neutral[500],
  textTransform: 'uppercase',
  borderTop: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
  borderBottom: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
  padding: theme.spacing(1, 3),
}));

export const EmptyCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
  padding: 0,
  height: theme.spacing(EMPTY_CELL_HEIGHT),
}));
