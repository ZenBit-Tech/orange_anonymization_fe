import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableBody, TableRow } from '@mui/material';

import type { Job } from '@/pages/Dashboard/types';

import { StyledTable, HeadCell, TableWrapper, EmptyCell } from './styled';

interface RecentActivityTableProps {
  rows: Job[];
}

const COLUMN_TRANSLATION_KEYS = [
  'dashboard.recentActivity.columns.document',
  'dashboard.recentActivity.columns.status',
  'dashboard.recentActivity.columns.framework',
  'dashboard.recentActivity.columns.entities',
  'dashboard.recentActivity.columns.date',
  'dashboard.recentActivity.columns.action',
] as const;

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
