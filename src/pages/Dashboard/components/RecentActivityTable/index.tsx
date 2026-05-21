import React from 'react';

import { useTranslation } from 'react-i18next';

import { DataTable } from '@/components/common/DataTable';
import type { ColumnDef } from '@/components/common/DataTable/types';

import { DocumentCell } from '@/features/analyses/components/DocumentCell';
import { StatusBadge } from '@/features/analyses/components/StatusBadge';

import { formatDate, formatFramework } from '@/features/analyses/utils/formatters';

import type { RecentActivity } from '@/services/dashboard/types';

import { BodyCell, CellContent } from './styled';

interface RecentActivityTableProps {
  rows: RecentActivity[];
}

const useColumns = (): ColumnDef<RecentActivity>[] => {
  const { t } = useTranslation();

  return [
    {
      key: 'document',
      header: t('dashboard.recentActivity.columns.document'),
      renderCell: (row) => (
        <BodyCell>
          <DocumentCell fileName={row.fileName} />
        </BodyCell>
      ),
    },
    {
      key: 'status',
      header: t('dashboard.recentActivity.columns.status'),
      renderCell: (row) => (
        <BodyCell>
          <StatusBadge status={row.status} />
        </BodyCell>
      ),
    },
    {
      key: 'framework',
      header: t('dashboard.recentActivity.columns.framework'),
      renderCell: (row) => (
        <BodyCell>
          <CellContent>{row.framework ? formatFramework(row.framework) : '–'}</CellContent>
        </BodyCell>
      ),
    },
    {
      key: 'entities',
      header: t('dashboard.recentActivity.columns.entities'),
      renderCell: (row) => (
        <BodyCell>
          <CellContent>{row.entitiesCount ?? '–'}</CellContent>
        </BodyCell>
      ),
    },
    {
      key: 'date',
      header: t('dashboard.recentActivity.columns.date'),
      renderCell: (row) => (
        <BodyCell>
          <CellContent>{formatDate(row.createdAt)}</CellContent>
        </BodyCell>
      ),
    },
  ];
};

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ rows }) => {
  const columns = useColumns();

  return <DataTable columns={columns} rows={rows} />;
};
