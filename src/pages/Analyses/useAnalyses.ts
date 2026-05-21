import { useMemo, useState } from 'react';

import type { RecentActivity } from '@/services/dashboard/types';

export const MOCK_ANALYSES: RecentActivity[] = [
  {
    id: '1',
    fileName: 'patients_data.csv',
    framework: 'hipaa',
    status: 'succeeded',
    entitiesCount: 15,
    createdAt: '2026-04-01T10:00:00Z',
  },
  {
    id: '2',
    fileName: 'clinical_notes.txt',
    framework: 'gdpr',
    status: 'failed',
    entitiesCount: 8,
    createdAt: '2026-04-03T10:00:00Z',
  },
  {
    id: '3',
    fileName: 'insurance_records.pdf',
    framework: 'swiss_fadp',
    status: 'queued',
    entitiesCount: 22,
    createdAt: '2026-04-05T10:00:00Z',
  },
  {
    id: '4',
    fileName: 'uk_citizens_registry.xlsx',
    framework: 'uk_dpi',
    status: 'processing',
    entitiesCount: 31,
    createdAt: '2026-04-09T10:00:00Z',
  },
  {
    id: '5',
    fileName: 'draft_document.docx',
    framework: null,
    status: 'draft',
    entitiesCount: null,
    createdAt: '2026-04-12T10:00:00Z',
  },
  {
    id: '6',
    fileName: 'configured_analysis.json',
    framework: null,
    status: 'configured',
    entitiesCount: 3,
    createdAt: '2026-04-14T10:00:00Z',
  },
  {
    id: '7',
    fileName: 'medical_archive_2026.zip',
    framework: 'hipaa',
    status: 'succeeded',
    entitiesCount: 54,
    createdAt: '2026-04-15T10:00:00Z',
  },
  {
    id: '8',
    fileName: 'extremely_long_document_name_to_test_overflow_behavior_in_table_layout.pdf',
    framework: 'gdpr',
    status: 'processing',
    entitiesCount: 11,
    createdAt: '2026-04-16T10:00:00Z',
  },
  {
    id: '9',
    fileName: 'employee_export.csv',
    framework: 'uk_dpi',
    status: 'failed',
    entitiesCount: 0,
    createdAt: '2026-04-18T10:00:00Z',
  },
  {
    id: '10',
    fileName: 'synthetic_data_results.pdf',
    framework: 'swiss_fadp',
    status: 'queued',
    entitiesCount: 18,
    createdAt: '2026-04-20T10:00:00Z',
  },
];

export const useAnalyses = () => {
  const [search, setSearch] = useState('');
  const [framework, setFramework] = useState('all');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => {
    return MOCK_ANALYSES.filter((row) => {
      const matchesSearch = row.fileName.toLowerCase().includes(search.toLowerCase());

      const matchesFramework = framework === 'all' || row.framework === framework;

      const matchesStatus = status === 'all' || row.status === status;

      return matchesSearch && matchesFramework && matchesStatus;
    });
  }, [framework, search, status]);

  const isEmpty = rows.length === 0;

  return {
    rows,

    search,
    setSearch,

    framework,
    setFramework,

    status,
    setStatus,

    isEmpty,
  };
};
