import React, { useState } from 'react';

import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AddIcon from '@/assets/icons/dashboard/add.svg?react';
import AnalyticsIcon from '@/assets/icons/dashboard/MetricCard/analytics.svg?react';
import DescriptionIcon from '@/assets/icons/dashboard/MetricCard/description.svg?react';
import ManageSearchIcon from '@/assets/icons/dashboard/MetricCard/manage_search.svg?react';
import VerifiedIcon from '@/assets/icons/dashboard/MetricCard/verified.svg?react';

import EntityIcon from '@/assets/icons/dashboard/EmptyStateCard/entity.svg?react';
import FrameworkIcon from '@/assets/icons/dashboard/EmptyStateCard/framework.svg?react';
import DeIdentificationIcon from '@/assets/icons/dashboard/EmptyStateCard/de-identification.svg?react';

import InfoIcon from '@/assets/icons/dashboard/info.svg?react';

import { EmptyStateCard } from '@/pages/Dashboard/components/EmptyStateCard';
import { MetricCard } from '@/pages/Dashboard/components/MetricCard';
import { RecentActivityTable } from '@/pages/Dashboard/components/RecentActivityTable';

import { ActivityChart } from './components/ActivityChart';
import { ChartControls } from './components/ActivityChart/ChartControls';
import { DashboardFilters } from './components/DashboardFilters';
import { FRAMEWORK_VALUES, type FrameworkValue } from './components/DashboardFilters/types';
import { DistributionChart } from './components/DistributionChart';

import {
  CHART_RANGES,
  CHART_TYPES,
  type ChartType,
  type Range,
} from './components/ActivityChart/types';

import {
  BottomGrid,
  Card,
  MetricsRow,
  NewAnalysisButton,
  PageWrapper,
  RecentActivityCard,
  SectionDivider,
  SectionSubtitle,
  SectionTitle,
  WelcomeBanner,
  WelcomeSubtitle,
  WelcomeText,
  WelcomeTitle,
  ChartHeaderRow,
} from './styled';

import { useDashboard } from './useDashboard';

const Dashboard: React.FC = () => {
  const {
    metrics,
    chartData,
    strategiesDistribution,
    frameworksDistribution,
    entitiesDistribution,
    recentActivity,
    state,
  } = useDashboard();

  const { t } = useTranslation();
  const [chartType, setChartType] = useState<ChartType>(CHART_TYPES.DOCUMENTS);
  const [range, setRange] = useState<Range>(CHART_RANGES.DAYS_7);
  const [framework, setFramework] = useState<FrameworkValue>(FRAMEWORK_VALUES.ALL);

  return (
    <PageWrapper>
      {state === 'empty' ? (
        <WelcomeBanner>
          <WelcomeText>
            <InfoIcon />
            <Box>
              <WelcomeTitle>{t('dashboard.welcomeTitle')}</WelcomeTitle>
              <WelcomeSubtitle>{t('dashboard.welcomeSubtitle')}</WelcomeSubtitle>
            </Box>
          </WelcomeText>

          <NewAnalysisButton startIcon={<AddIcon />}>
            {t('dashboard.newAnalysis')}
          </NewAnalysisButton>
        </WelcomeBanner>
      ) : (
        <DashboardFilters
          range={range}
          framework={framework}
          setRange={setRange}
          setFramework={setFramework}
        />
      )}

      <MetricsRow>
        <MetricCard
          icon={<DescriptionIcon />}
          label={t('dashboard.metrics.totalDocuments')}
          value={metrics?.totalDocuments ?? 0}
          state={state}
        />
        <MetricCard
          icon={<ManageSearchIcon />}
          label={t('dashboard.metrics.entitiesDetected')}
          value={metrics?.entitiesDetected ?? 0}
          state={state}
        />
        <MetricCard
          icon={<VerifiedIcon />}
          label={t('dashboard.metrics.anonymizationRate')}
          value={`${metrics?.anonymizationRate ?? 0}%`}
          state={state}
        />
        <MetricCard
          icon={<AnalyticsIcon />}
          label={t('dashboard.metrics.syntheticRecords')}
          value={metrics?.syntheticRecords ?? 0}
          state={state}
        />
      </MetricsRow>

      <Card>
        <ChartHeaderRow>
          <Box>
            <SectionTitle>{t('dashboard.chart.activityTitle')}</SectionTitle>
            <SectionSubtitle>{t('dashboard.chart.activitySubtitle')}</SectionSubtitle>
          </Box>

          <ChartControls chartType={chartType} setChartType={setChartType} />
        </ChartHeaderRow>

        <SectionDivider />

        <ActivityChart chartData={chartData} chartType={chartType} range={range} state={state} />
      </Card>

      <BottomGrid>
        <EmptyStateCard
          icon={<DeIdentificationIcon />}
          title={t('dashboard.emptyState.deIdentification.title')}
          subtitle={t('dashboard.emptyState.deIdentification.subtitle')}
          state={state}
        >
          <DistributionChart data={strategiesDistribution} />
        </EmptyStateCard>

        <EmptyStateCard
          icon={<FrameworkIcon />}
          title={t('dashboard.emptyState.compliance.title')}
          subtitle={t('dashboard.emptyState.compliance.subtitle')}
          state={state}
        >
          <DistributionChart data={frameworksDistribution} />
        </EmptyStateCard>

        <EmptyStateCard
          icon={<EntityIcon />}
          title={t('dashboard.emptyState.entityTypes.title')}
          subtitle={t('dashboard.emptyState.entityTypes.subtitle')}
          state={state}
        >
          <DistributionChart data={entitiesDistribution} />
        </EmptyStateCard>
      </BottomGrid>

      <RecentActivityCard>
        <SectionTitle>{t('dashboard.recentActivity.title')}</SectionTitle>
        <SectionSubtitle>{t('dashboard.recentActivity.subtitle')}</SectionSubtitle>
        <RecentActivityTable rows={recentActivity} />
      </RecentActivityCard>
    </PageWrapper>
  );
};

export default Dashboard;
