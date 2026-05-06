import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableBody, TableRow } from '@mui/material';
import { StyledTable, HeadCell, TableWrapper, EmptyCell } from './styled';
import { COLUMN_TRANSLATION_KEYS } from './RecentActivityTable.const';
import type { Job } from '@/pages/Dashboard/types';

interface RecentActivityTableProps {
  rows: Job[];
}

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ rows }) => {
  const { t } = useTranslation();

  return (
    <TableWrapper>
      <StyledTable>
        <TableHead>
          <TableRow>
            {COLUMN_TRANSLATION_KEYS.map((key) => (
              <HeadCell key={key}>{t(key)}</HeadCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length ? (
            rows.map((row) => <TableRow key={row.id} />)
          ) : (
            <TableRow>
              <EmptyCell colSpan={COLUMN_TRANSLATION_KEYS.length} />
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};
