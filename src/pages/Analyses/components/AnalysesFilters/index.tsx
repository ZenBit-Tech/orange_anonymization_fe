import React from 'react';

import SearchIcon from '@mui/icons-material/Search';

import { InputAdornment } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@/assets/icons/dashboard/add.svg?react';

import { ROUTES } from '@/constants';

import { FRAMEWORK_OPTIONS } from '@/pages/Dashboard/components/DashboardFilters/constants';

import { FilterMenuItem, FilterSelect } from '@/pages/Dashboard/components/DashboardFilters/styled';

import type { FrameworkValue } from '@/pages/Dashboard/components/DashboardFilters/types';

import { NewAnalysisButton } from '@/pages/Dashboard/styled';

import { FiltersContainer, FiltersRow, SearchInput } from './styled';

const STATUS_OPTIONS = [
  {
    value: 'all',
    translationKey: 'dashboard.analyses.filters.allStatuses',
  },
  {
    value: 'succeeded',
    translationKey: 'dashboard.recentActivity.status.succeeded',
  },
  {
    value: 'failed',
    translationKey: 'dashboard.recentActivity.status.failed',
  },
  {
    value: 'queued',
    translationKey: 'dashboard.recentActivity.status.queued',
  },
  {
    value: 'processing',
    translationKey: 'dashboard.recentActivity.status.processing',
  },
  {
    value: 'draft',
    translationKey: 'dashboard.recentActivity.status.draft',
  },
  {
    value: 'configured',
    translationKey: 'dashboard.recentActivity.status.configured',
  },
] as const;

interface Props {
  search: string;
  framework: FrameworkValue;
  status: string;
  setSearch: (value: string) => void;
  setFramework: (value: FrameworkValue) => void;
  setStatus: (value: string) => void;
}

export const AnalysesFilters: React.FC<Props> = ({
  search,
  framework,
  status,
  setSearch,
  setFramework,
  setStatus,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFrameworkChange = (event: SelectChangeEvent) => {
    setFramework(event.target.value as FrameworkValue);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <FiltersContainer>
      <FiltersRow>
        <SearchInput
          placeholder={t('dashboard.analyses.filters.searchByFilename')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FilterSelect value={framework} onChange={handleFrameworkChange}>
          {FRAMEWORK_OPTIONS.map((option) => (
            <FilterMenuItem key={option.value} value={option.value}>
              {t(option.translationKey)}
            </FilterMenuItem>
          ))}
        </FilterSelect>

        <FilterSelect value={status} onChange={handleStatusChange}>
          {STATUS_OPTIONS.map((option) => (
            <FilterMenuItem key={option.value} value={option.value}>
              {t(option.translationKey)}
            </FilterMenuItem>
          ))}
        </FilterSelect>
      </FiltersRow>

      <NewAnalysisButton startIcon={<AddIcon />} onClick={() => navigate(ROUTES.DE_IDENTIFY)}>
        {t('dashboard.newAnalysis')}
      </NewAnalysisButton>
    </FiltersContainer>
  );
};
