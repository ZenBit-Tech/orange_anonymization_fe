import { Box, TableCell, styled } from '@mui/material';

import type { JobStatus } from '@/services/dashboard/types';
import { BORDERS } from '@/theme';

const ICON_SIZE = 20;

const STATUS_COLORS: Record<JobStatus, string> = {
  draft: '#9CA3AF',
  configured: '#8B5CF6',
  queued: '#2563EB',
  processing: '#D97706',
  succeeded: '#16A34A',
  failed: '#DC2626',
};

export const BodyCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderBottom: `${BORDERS.card}px solid ${theme.palette.divider}`,
  maxWidth: 0,
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

export const DocumentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  minWidth: 0,
  width: '100%',

  '& svg': {
    width: ICON_SIZE,
    height: ICON_SIZE,
    flexShrink: 0,
    color: theme.palette.neutral[900],
  },
}));

export const DocumentName = styled(CellContent)(({ theme }) => ({
  ...theme.typography.labelMd,
  color: theme.palette.neutral[900],
}));

export const StatusWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.25),
  minWidth: 0,
  width: '100%',
}));

interface StatusDotProps {
  status: JobStatus;
}

export const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<StatusDotProps>(({ status }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  flexShrink: 0,
  marginTop: 6,
  backgroundColor: STATUS_COLORS[status],
}));
