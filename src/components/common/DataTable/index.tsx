import React from 'react';
import { TableHead, TableBody, TableRow, CircularProgress } from '@mui/material';

import { StyledTable, HeadCell, TableWrapper, EmptyCell, StateWrapper, ErrorText } from './styled';

import type { ColumnDef } from './types';
import type { DashboardState } from '@/pages/Dashboard/types';

interface DataTableProps<TRow extends { id: string | number }> {
  columns: ColumnDef<TRow>[];
  rows: TRow[];
  state?: DashboardState;
  emptyMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
}

export const DataTable = <TRow extends { id: string | number }>({
  columns,
  rows,
  state = 'content',
  emptyMessage,
  errorMessage,
}: DataTableProps<TRow>) => {
  if (state === 'loading') {
    return (
      <StateWrapper>
        <CircularProgress />
      </StateWrapper>
    );
  }

  if (state === 'error') {
    return (
      <StateWrapper>
        <ErrorText>{errorMessage}</ErrorText>
      </StateWrapper>
    );
  }

  return (
    <TableWrapper>
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <HeadCell key={col.key}>{col.header}</HeadCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <React.Fragment key={col.key}>{col.renderCell(row)}</React.Fragment>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <EmptyCell colSpan={columns.length}>{emptyMessage}</EmptyCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};
