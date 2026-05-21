import { Box, styled } from '@mui/material';

import FileIcon from '@/assets/icons/dashboard/MetricCard/description.svg?react';

const ICON_SIZE = 20;

const Wrapper = styled(Box)(({ theme }) => ({
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

const Name = styled(Box)(({ theme }) => ({
  ...theme.typography.labelMd,
  minWidth: 0,
  width: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  color: theme.palette.neutral[900],
}));

interface DocumentCellProps {
  fileName: string;
}

export const DocumentCell = ({ fileName }: DocumentCellProps) => {
  return (
    <Wrapper>
      <FileIcon />
      <Name>{fileName}</Name>
    </Wrapper>
  );
};
