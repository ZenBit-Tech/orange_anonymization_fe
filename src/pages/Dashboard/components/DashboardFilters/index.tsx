import React from 'react';

import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@/assets/icons/dashboard/add.svg?react';
import { ROUTES } from '@/constants';

import { CHART_RANGES, type Range } from '@/pages/Dashboard/components/ActivityChart/types';
import { NewAnalysisButton } from '@/pages/Dashboard/styled';

import { FRAMEWORK_OPTIONS } from './constants';
import { FiltersContainer, FiltersRow, FilterMenuItem, FilterSelect } from './styled';

import type { FrameworkValue } from './types';

interface DashboardFiltersProps {
  range: Range;
  framework: FrameworkValue;
  setRange: (value: Range) => void;
  setFramework: (value: FrameworkValue) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  range,
  framework,
  setRange,
  setFramework,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRangeChange = (event: SelectChangeEvent<string>) => {
    setRange(event.target.value as Range);
  };

  const handleFrameworkChange = (event: SelectChangeEvent) => {
    setFramework(event.target.value as FrameworkValue);
  };

  return (
    <FiltersContainer>
      <FiltersRow>
        <FilterSelect value={framework} onChange={handleFrameworkChange}>
          {FRAMEWORK_OPTIONS.map((option) => (
            <FilterMenuItem key={option.value} value={option.value}>
              {t(option.translationKey)}
            </FilterMenuItem>
          ))}
        </FilterSelect>

        <FilterSelect value={range} onChange={handleRangeChange}>
          <FilterMenuItem value={CHART_RANGES.TODAY}>{t('dashboard.filters.today')}</FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.YESTERDAY}>
            {t('dashboard.filters.yesterday')}
          </FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.DAYS_7}>
            {t('dashboard.filters.last7Days')}
          </FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.DAYS_14}>
            {t('dashboard.filters.last14Days')}
          </FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.DAYS_30}>
            {t('dashboard.filters.last30Days')}
          </FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.MONTHS_3}>
            {t('dashboard.filters.last3Months')}
          </FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.MONTHS_6}>
            {t('dashboard.filters.last6Months')}
          </FilterMenuItem>

          <FilterMenuItem value={CHART_RANGES.CUSTOM}>
            {t('dashboard.filters.customRange')}
          </FilterMenuItem>
        </FilterSelect>
      </FiltersRow>

      <NewAnalysisButton startIcon={<AddIcon />} onClick={() => navigate(ROUTES.DE_IDENTIFY)}>
        {t('dashboard.newAnalysis')}
      </NewAnalysisButton>
    </FiltersContainer>
  );
};
