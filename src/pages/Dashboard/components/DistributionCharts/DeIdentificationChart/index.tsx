import React from 'react';

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ReferenceLine,
} from 'recharts';

import { useTheme } from '@mui/material';

import type { DistributionData } from '@/services/dashboard/types';

import { ChartWrapper } from './styled';

interface Props {
  data: DistributionData[];
}

const CHART_HEIGHT = 320;
const BAR_SIZE = 16;
const BAR_GAP = 24;
const MAX_DOMAIN = 250;
const GRID_STROKE_WIDTH = 1;
const GRID_DASH_ARRAY = '3 3';
const BAR_RADIUS: [number, number, number, number] = [0, 4, 4, 0];
const Y_AXIS_WIDTH = 110;

const CHART_MARGIN = {
  top: 20,
  right: 0,
  left: -20,
  bottom: 0,
};

const TICKS = [0, 50, 100, 150, 200, 250];

const generateHorizontalCoordinates = (height: number, itemsCount: number, topOffset: number) => {
  const step = height / itemsCount;

  return Array.from({ length: itemsCount + 1 }, (_, index) => topOffset + step * index);
};

export const DeIdentificationChart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const ALL_STRATEGIES = [
    'Redact',
    'Replace',
    'Mask',
    'Hash',
    'Synthetic',
    'Token',
    'Generalise',
    'Pseudonymise',
    'NLP',
  ] as const;

  const STRATEGY_LABELS: Record<string, string> = {
    Redact: 'Redact',
    Replace: 'Replace',
    Mask: 'Mask',
    Hash: 'Hash',
    Synthetic: 'Synthetic',
    Token: 'Tokenization',
    Generalise: 'Generalise',
    Pseudonymise: 'Pseudonymise',
    NLP: 'NLP redaction',
  };

  const normalizedData = ALL_STRATEGIES.map((key) => {
    const found = data.find((d) => d.name === key);

    return {
      name: STRATEGY_LABELS[key],
      count: found?.count ?? 0,
    };
  });

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart
          data={normalizedData}
          layout="vertical"
          margin={CHART_MARGIN}
          barCategoryGap={BAR_GAP}
        >
          <CartesianGrid
            vertical
            stroke={theme.palette.charts.grid}
            strokeDasharray={GRID_DASH_ARRAY}
            horizontalCoordinatesGenerator={({ offset }) =>
              generateHorizontalCoordinates(offset.height, normalizedData.length, offset.top)
            }
          />

          <ReferenceLine
            x={MAX_DOMAIN}
            stroke={theme.palette.charts.grid}
            strokeWidth={GRID_STROKE_WIDTH}
            strokeDasharray={GRID_DASH_ARRAY}
          />

          <XAxis
            type="number"
            orientation="top"
            domain={[0, MAX_DOMAIN]}
            ticks={TICKS}
            tickLine={false}
            axisLine={{
              stroke: theme.palette.charts.grid,
            }}
            tick={{
              fontWeight: theme.typography.labelSm.fontWeight,
              fontSize: theme.typography.labelSm.fontSize,
              fill: theme.palette.neutral[500],
            }}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={Y_AXIS_WIDTH}
            tickLine={false}
            axisLine={{
              stroke: theme.palette.charts.grid,
            }}
            tick={{
              fontWeight: theme.typography.labelSm.fontWeight,
              fontSize: theme.typography.labelSm.fontSize,
              fill: theme.palette.neutral[500],
            }}
          />

          <Bar
            dataKey="count"
            fill={theme.palette.charts.deIdentification}
            radius={BAR_RADIUS}
            barSize={BAR_SIZE}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
