import React from 'react';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { PaginationItem } from '@mui/material';
import type { PaginationRenderItemParams } from '@mui/material';

import { PaginationContainer, StyledPagination } from './styled';

interface AnalysesPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const AnalysesPagination: React.FC<AnalysesPaginationProps> = ({
  page,
  totalPages,
  onChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <StyledPagination
        page={page}
        count={totalPages}
        onChange={(_, value) => onChange(value)}
        showFirstButton
        showLastButton
        renderItem={(item: PaginationRenderItemParams) => (
          <PaginationItem
            slots={{
              first: SkipPreviousIcon,
              last: SkipNextIcon,
              previous: NavigateBeforeIcon,
              next: NavigateNextIcon,
            }}
            {...item}
          />
        )}
      />
    </PaginationContainer>
  );
};
