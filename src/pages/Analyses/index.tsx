import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { AnalysesTable } from '@/features/analyses/components/AnalysesTable';
import { exportAnalysesToCsv } from '@/features/analyses/utils/exportCsv';
import { isWithinDateRange } from '@/features/analyses/utils/dateFilter';

import {
  FRAMEWORK_VALUES,
  type FrameworkValue,
} from '@/pages/Dashboard/components/DashboardFilters/types';

import { useAnalyses } from './useAnalyses';

import { AnalysesCard, AnalysesCardCenteredContent, AnalysesFooter, PageWrapper } from './styled';

import { AnalysesFilters } from './components/AnalysesFilters';
import { AnalysesPagination } from './components/AnalysesPagination';
import { ExportCsvButton } from './components/ExportCsvButton';

const ROWS_PER_PAGE = 10;

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const Analyses: React.FC = () => {
  const { t } = useTranslation();
  const { rows, isLoading, error } = useAnalyses();
  const tableRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [framework, setFramework] = useState<FrameworkValue>(FRAMEWORK_VALUES.ALL);
  const [status, setStatus] = useState<string>('all');
  const [page, setPage] = useState(1);

  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.fileName?.toLowerCase().includes(search.toLowerCase());

      const matchesFramework =
        framework === FRAMEWORK_VALUES.ALL ||
        row.framework?.toLowerCase() === framework.toLowerCase();

      const matchesStatus = status === 'all' || row.status?.toLowerCase() === status.toLowerCase();
      const matchesDate = isWithinDateRange(row.createdAt, dateRange.start, dateRange.end);

      return matchesSearch && matchesFramework && matchesStatus && matchesDate;
    });
  }, [rows, search, framework, status, dateRange]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const startIndex = (safePage - 1) * ROWS_PER_PAGE;

    return filteredRows.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredRows, safePage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    requestAnimationFrame(() => {
      tableRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleExportCsv = () => {
    exportAnalysesToCsv(filteredRows);
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <AnalysesCardCenteredContent>
          <CircularProgress />
        </AnalysesCardCenteredContent>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <AnalysesCardCenteredContent>
          <Typography color="error">
            {t('dashboard.errors.failedToLoadAnalysesActivity')}
          </Typography>
        </AnalysesCardCenteredContent>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <AnalysesFilters
        search={search}
        framework={framework}
        status={status}
        setSearch={(value) => {
          setPage(1);
          setSearch(value);
        }}
        setFramework={(value) => {
          setPage(1);
          setFramework(value);
        }}
        setStatus={(value) => {
          setPage(1);
          setStatus(value);
        }}
        dateRange={dateRange}
        setDateRange={(value) => {
          setPage(1);
          setDateRange(value);
        }}
      />

      <AnalysesCard ref={tableRef}>
        <AnalysesTable rows={paginatedRows} />

        <AnalysesFooter>
          <Box sx={{ flex: 1 }}>
            {totalPages > 1 && (
              <AnalysesPagination
                page={safePage}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            )}
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <ExportCsvButton onClick={handleExportCsv} />
          </Box>
        </AnalysesFooter>
      </AnalysesCard>
    </PageWrapper>
  );
};

export default Analyses;
