import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';

import { getEmptyChartDates } from '@/utils/dashboard.utils';

import {
  GRID_STYLES,
  X_AXIS_TICK_STYLES,
  Y_AXIS_TICK_STYLES,
  X_AXIS_LINE,
  ChartWrapper,
} from './styled';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en', { month: 'short' });
  return `${day} ${month}`;
};

export const LineChart: React.FC = () => {
  const chartData = getEmptyChartDates().map((date) => ({
    date,
    _empty: 0,
  }));

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid {...GRID_STYLES} vertical={true} horizontal={true} />

          <XAxis
            dataKey="date"
            interval={0}
            tickFormatter={formatDate}
            tick={X_AXIS_TICK_STYLES}
            axisLine={X_AXIS_LINE}
            tickLine={false}
          />

          <YAxis
            domain={[0, 1000]}
            ticks={[0, 200, 400, 600, 800, 1000]}
            tick={Y_AXIS_TICK_STYLES}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          <Area dataKey="_empty" stroke="none" fill="none" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
