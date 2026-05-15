import React from 'react';
import { useTranslation } from 'react-i18next';

import { CircularProgress } from '@mui/material';

import type { DashboardState } from '@/pages/Dashboard/types';

import { CardWrapper, Title, Subtitle, EmptyBody, EmptyLabel, SectionDivider } from './styled';

interface EmptyStateCardProps {
  state: DashboardState;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon,
  title,
  subtitle,
  state,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <CardWrapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <SectionDivider />

      {state === 'loading' && (
        <EmptyBody>
          <CircularProgress size={28} />
        </EmptyBody>
      )}

      {state === 'error' && (
        <EmptyBody>
          <EmptyLabel>{t('dashboard.errors.failedToLoadAnalysesActivity')}</EmptyLabel>
        </EmptyBody>
      )}

      {state === 'empty' && (
        <EmptyBody>
          {icon}
          <EmptyLabel>{t('dashboard.emptyState.noAnalysesFound')}</EmptyLabel>
        </EmptyBody>
      )}

      {state === 'content' && children}
    </CardWrapper>
  );
};
