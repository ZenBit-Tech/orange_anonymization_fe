import { Box, TableCell, styled } from '@mui/material';

import { BORDERS } from '@/theme';

export const BodyCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderBottom: `${BORDERS.card}px solid ${theme.palette.divider}`,
  maxWidth: 0,
}));

export const TableWrapper = styled(Box)(() => ({
  marginTop: 0,
}));

export const CellContent = styled(Box)(({ theme }) => ({
  ...theme.typography.labelMd,
  minWidth: 0,
  width: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  color: theme.palette.neutral[500],
}));
