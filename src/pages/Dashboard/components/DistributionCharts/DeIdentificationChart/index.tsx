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
const Y_AXIS_WIDTH = 120;

const CHART_MARGIN = {
  top: 20,
  right: 16,
  left: 0,
  bottom: 8,
};

const TICKS = [0, 50, 100, 150, 200, 250];

const generateHorizontalCoordinates = (height: number, itemsCount: number, topOffset: number) => {
  const step = height / itemsCount;

  return Array.from({ length: itemsCount + 1 }, (_, index) => topOffset + step * index);
};

export const DeIdentificationChart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart data={data} layout="vertical" margin={CHART_MARGIN} barCategoryGap={BAR_GAP}>
          <CartesianGrid
            vertical
            stroke={theme.palette.charts.grid}
            strokeDasharray={GRID_DASH_ARRAY}
            horizontalCoordinatesGenerator={({ offset }) =>
              generateHorizontalCoordinates(offset.height, data.length, offset.top)
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
