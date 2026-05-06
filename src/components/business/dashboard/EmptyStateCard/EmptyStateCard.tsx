import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardWrapper, Title, Subtitle, EmptyBody, EmptyLabel, SectionDivider } from './styled';

interface EmptyStateCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isEmpty: boolean;
  children?: React.ReactNode;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon,
  title,
  subtitle,
  isEmpty,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <CardWrapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <SectionDivider />

      {isEmpty ? (
        <EmptyBody>
          {icon}
          <EmptyLabel>{t('dashboard.emptyState.noAnalysesFound')}</EmptyLabel>
        </EmptyBody>
      ) : (
        children
      )}
    </CardWrapper>
  );
};
