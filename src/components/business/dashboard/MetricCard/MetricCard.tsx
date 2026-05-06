import React from 'react';
import { Box } from '@mui/material';
import { CardWrapper, IconWrapper, Label, TopBar, Value } from './styled';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value }) => {
  return (
    <CardWrapper>
      <TopBar />
      <IconWrapper>{icon}</IconWrapper>
      <Box>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </Box>
    </CardWrapper>
  );
};
