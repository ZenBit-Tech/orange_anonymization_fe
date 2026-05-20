import React from 'react';

import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import FileIcon from '@/assets/icons/dashboard/MetricCard/description.svg?react';

import { DataTable } from '@/components/common/DataTable';
import type { ColumnDef } from '@/components/common/DataTable/types';

import type { RecentActivity } from '@/services/dashboard/types';

import {
  BodyCell,
  CellContent,
  DocumentName,
  DocumentWrapper,
  StatusDot,
  StatusWrapper,
} from './styled';

interface RecentActivityTableProps {
  rows: RecentActivity[];
}

const formatFramework = (framework: string | null, t: TFunction): string => {
  switch (framework?.toLowerCase()) {
    case 'hipaa':
      return t('dashboard.frameworks.hipaa');
    case 'gdpr':
      return t('dashboard.frameworks.gdpr');
    case 'uk_dpi':
      return t('dashboard.frameworks.ukDpi');
    case 'swiss_fadp':
      return t('dashboard.frameworks.swissFadp');
    default:
      return t('dashboard.frameworks.custom');
  }
};

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const useColumns = (): ColumnDef<RecentActivity>[] => {
  const { t } = useTranslation();

  return [
    {
      key: 'document',
      header: t('dashboard.recentActivity.columns.document'),
      renderCell: (row) => (
        <BodyCell>
          <DocumentWrapper>
            <FileIcon />
            <DocumentName>{row.fileName}</DocumentName>
          </DocumentWrapper>
        </BodyCell>
      ),
    },
    {
      key: 'status',
      header: t('dashboard.recentActivity.columns.status'),
      renderCell: (row) => (
        <BodyCell>
          <StatusWrapper>
            <StatusDot status={row.status} />
            <CellContent>{t(`dashboard.recentActivity.status.${row.status}`)}</CellContent>
          </StatusWrapper>
        </BodyCell>
      ),
    },
    {
      key: 'framework',
      header: t('dashboard.recentActivity.columns.framework'),
      renderCell: (row) => (
        <BodyCell>
          <CellContent>{formatFramework(row.framework, t)}</CellContent>
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
