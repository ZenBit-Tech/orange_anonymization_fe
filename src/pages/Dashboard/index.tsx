import React from 'react';

import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { MetricCard } from '@/components/business/dashboard/MetricCard';
import { LineChart } from '@/components/business/dashboard/LineChart';
import { EmptyStateCard } from '@/components/business/dashboard/EmptyStateCard';
import { RecentActivityTable } from '@/components/business/dashboard/RecentActivityTable';

import InfoIcon from '@/assets/icons/dashboard/info.svg?react';
import AddIcon from '@/assets/icons/dashboard/add.svg?react';
import DescriptionIcon from '@/assets/icons/dashboard/MetricCard/description.svg?react';
import ManageSearchIcon from '@/assets/icons/dashboard/MetricCard/manage_search.svg?react';
import VerifiedIcon from '@/assets/icons/dashboard/MetricCard/verified.svg?react';
import AnalyticsIcon from '@/assets/icons/dashboard/MetricCard/analytics.svg?react';
import DeIdentificationIcon from '@/assets/icons/dashboard/EmptyStateCard/de-identification.svg?react';
import FrameworkIcon from '@/assets/icons/dashboard/EmptyStateCard/framework.svg?react';
import EntityIcon from '@/assets/icons/dashboard/EmptyStateCard/entity.svg?react';

import { useDashboard } from './useDashboard';
import {
  PageWrapper,
  WelcomeBanner,
  WelcomeText,
  WelcomeTitle,
  WelcomeSubtitle,
  NewAnalysisButton,
  MetricsRow,
  BottomGrid,
  SectionTitle,
  SectionSubtitle,
  Card,
  SectionDivider,
  RecentActivityCard,
} from './styled';

const Dashboard: React.FC = () => {
  const { metrics, recentActivity, isEmpty } = useDashboard();
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <WelcomeBanner>
        <WelcomeText>
          <InfoIcon />
          <Box>
            <WelcomeTitle>{t('dashboard.welcomeTitle')}</WelcomeTitle>
            <WelcomeSubtitle>{t('dashboard.welcomeSubtitle')}</WelcomeSubtitle>
          </Box>
        </WelcomeText>

        <NewAnalysisButton startIcon={<AddIcon />}>{t('dashboard.newAnalysis')}</NewAnalysisButton>
      </WelcomeBanner>

      <MetricsRow>
        <MetricCard
          icon={<DescriptionIcon />}
          label={t('dashboard.metrics.totalDocuments')}
          value={metrics.totalDocuments}
        />
        <MetricCard
          icon={<ManageSearchIcon />}
          label={t('dashboard.metrics.entitiesDetected')}
          value={metrics.entitiesDetected}
        />
        <MetricCard
          icon={<VerifiedIcon />}
          label={t('dashboard.metrics.anonymizationRate')}
          value={metrics.anonymizationRate}
        />
        <MetricCard
          icon={<AnalyticsIcon />}
          label={t('dashboard.metrics.syntheticRecords')}
          value={metrics.syntheticRecords}
        />
      </MetricsRow>

      <Card>
        <SectionTitle>{t('dashboard.chart.activityTitle')}</SectionTitle>
        <SectionSubtitle>{t('dashboard.chart.activitySubtitle')}</SectionSubtitle>
        <SectionDivider />
        <LineChart />
      </Card>

      <BottomGrid>
        <EmptyStateCard
          icon={<DeIdentificationIcon />}
          title={t('dashboard.emptyState.deIdentification.title')}
          subtitle={t('dashboard.emptyState.deIdentification.subtitle')}
          isEmpty={isEmpty}
        />
        <EmptyStateCard
          icon={<FrameworkIcon />}
          title={t('dashboard.emptyState.compliance.title')}
          subtitle={t('dashboard.emptyState.compliance.subtitle')}
          isEmpty={isEmpty}
        />
        <EmptyStateCard
          icon={<EntityIcon />}
          title={t('dashboard.emptyState.entityTypes.title')}
          subtitle={t('dashboard.emptyState.entityTypes.subtitle')}
          isEmpty={isEmpty}
        />
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
