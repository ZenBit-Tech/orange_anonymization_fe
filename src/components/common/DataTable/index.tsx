import React from 'react';
import { TableHead, TableBody, TableRow } from '@mui/material';

import { StyledTable, HeadCell, TableWrapper, EmptyCell } from './styled';
import type { ColumnDef } from './types';

interface DataTableProps<TRow extends { id: string | number }> {
  columns: ColumnDef<TRow>[];
  rows: TRow[];
}

export const DataTable = <TRow extends { id: string | number }>({
  columns,
  rows,
}: DataTableProps<TRow>) => {
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
              <EmptyCell colSpan={columns.length} />
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};
