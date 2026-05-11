import React from 'react';

import { Box, Skeleton } from '@mui/material';

import { CardWrapper, IconWrapper, Label, TopBar, Value } from './styled';

const SKELETON_WIDTH = 60;
const SKELETON_HEIGHT = 36;

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading?: boolean;
  error?: string | null;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, loading, error }) => {
  const renderValue = () => {
    if (loading) {
      return <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />;
    }

    if (error) {
      return <Value>—</Value>;
    }

    return <Value>{value}</Value>;
  };

  return (
    <CardWrapper>
      <TopBar />
      <IconWrapper>{icon}</IconWrapper>

      <Box>
        <Label>{label}</Label>
        {renderValue()}
      </Box>
    </CardWrapper>
  );
};
