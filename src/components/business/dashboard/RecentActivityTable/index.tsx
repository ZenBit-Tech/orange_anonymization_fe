import React from 'react';
import { TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { Job } from '@/pages/Dashboard/types';
import type { ColumnDef } from '@/components/common/DataTable/types';
import { DataTable } from '@/components/common/DataTable';

interface RecentActivityTableProps {
  rows: Job[];
}

const useColumns = (): ColumnDef<Job>[] => {
  const { t } = useTranslation();

  return [
    {
      key: 'document',
      header: t('dashboard.recentActivity.columns.document'),
      renderCell: (row) => <TableCell>{row.document}</TableCell>,
    },
    {
      key: 'status',
      header: t('dashboard.recentActivity.columns.status'),
      renderCell: (row) => <TableCell>{row.status}</TableCell>,
    },
    {
      key: 'framework',
      header: t('dashboard.recentActivity.columns.framework'),
      renderCell: (row) => <TableCell>{row.framework}</TableCell>,
    },
    {
      key: 'entities',
      header: t('dashboard.recentActivity.columns.entities'),
      renderCell: (row) => <TableCell>{row.entities}</TableCell>,
    },
    {
      key: 'date',
      header: t('dashboard.recentActivity.columns.date'),
      renderCell: (row) => <TableCell>{row.date}</TableCell>,
    },
    {
      key: 'action',
      header: t('dashboard.recentActivity.columns.action'),
      renderCell: () => <TableCell />,
    },
  ];
};

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ rows }) => {
  const columns = useColumns();

  return (
    <>
      <DataTable columns={columns} rows={rows} />
    </>
  );
};
