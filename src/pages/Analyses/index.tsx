import React, { useMemo, useState } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { AnalysesTable } from '@/features/analyses/components/AnalysesTable';

import {
  FRAMEWORK_VALUES,
  type FrameworkValue,
} from '@/pages/Dashboard/components/DashboardFilters/types';

import { AnalysesCard, PageWrapper } from './styled';
import { AnalysesFilters } from './components/AnalysesFilters';
import { useAnalyses } from './useAnalyses';

const ANALYSES_CARD_MIN_HEIGHT = 320;

const Analyses: React.FC = () => {
  const { t } = useTranslation();
  const { rows, isLoading, error } = useAnalyses();
  const [search, setSearch] = useState('');
  const [framework, setFramework] = useState<FrameworkValue>(FRAMEWORK_VALUES.ALL);
  const [status, setStatus] = useState<string>('all');

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.fileName?.toLowerCase().includes(search.toLowerCase());

      const matchesFramework =
        framework === FRAMEWORK_VALUES.ALL ||
        row.framework?.toLowerCase() === framework.toLowerCase();

      const matchesStatus = status === 'all' || row.status?.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesFramework && matchesStatus;
    });
  }, [rows, search, framework, status]);

  if (isLoading) {
    return (
      <PageWrapper>
        <AnalysesCard
          sx={{
            minHeight: ANALYSES_CARD_MIN_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </AnalysesCard>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <AnalysesCard
          sx={{
            minHeight: ANALYSES_CARD_MIN_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="error">
            {t('dashboard.errors.failedToLoadAnalysesActivity')}
          </Typography>
        </AnalysesCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <AnalysesFilters
        search={search}
        framework={framework}
        status={status}
        setSearch={setSearch}
        setFramework={setFramework}
        setStatus={setStatus}
      />

      <AnalysesCard>
        <AnalysesTable rows={filteredRows} />
      </AnalysesCard>
    </PageWrapper>
  );
};

export default Analyses;
