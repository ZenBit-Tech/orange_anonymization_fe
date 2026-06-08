import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { JobStatus } from '@/services/dashboard/types';

import { theme } from '@/theme';

const STATUS_COLORS: Record<JobStatus, string> = {
  succeeded: theme.palette.success.main,
  processing: theme.palette.warning.main,
  failed: theme.palette.error.main,
  draft: theme.palette.neutral[400]!,
  configured: theme.palette.status.configured,
  queued: theme.palette.info.main,
};

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.25),
  minWidth: 0,
  width: '100%',
}));

const Content = styled(Box)(({ theme }) => ({
  ...theme.typography.labelMd,
  minWidth: 0,
  width: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  color: theme.palette.neutral[500],
}));

interface DotProps {
  status: JobStatus;
}

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<DotProps>(({ status }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  flexShrink: 0,
  marginTop: 6,
  backgroundColor: STATUS_COLORS[status],
}));

interface StatusBadgeProps {
  status: JobStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Dot status={status} />
      <Content>{t(`dashboard.recentActivity.status.${status}`)}</Content>
    </Wrapper>
  );
};
