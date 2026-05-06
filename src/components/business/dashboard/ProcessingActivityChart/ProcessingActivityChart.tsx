import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import {
  GRID_STYLES,
  X_AXIS_TICK_STYLES,
  Y_AXIS_TICK_STYLES,
  X_AXIS_LINE,
  ChartWrapper,
} from './styled';
import {
  EMPTY_DATES,
  EMPTY_DATA_KEY,
  EMPTY_CHART_VALUE,
  CHART_INTERVAL,
  CHART_FULL_WIDTH,
  DATE_PAD_LENGTH,
  DATE_PAD_CHAR,
  DATE_LOCALE,
  DATE_FORMAT_OPTIONS,
  CHART_HEIGHT,
  CHART_MARGIN,
  Y_AXIS_DOMAIN,
  Y_AXIS_TICKS,
  Y_AXIS_WIDTH,
} from './ProcessingActivityChart.const';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const day = String(date.getDate()).padStart(DATE_PAD_LENGTH, DATE_PAD_CHAR);
  const month = date.toLocaleString(DATE_LOCALE, DATE_FORMAT_OPTIONS);
  return `${day} ${month}`;
};

const chartData = EMPTY_DATES.map((date) => ({ date, [EMPTY_DATA_KEY]: EMPTY_CHART_VALUE }));

export const ProcessingActivityChart: React.FC = () => {
  return (
    <ChartWrapper>
      <ResponsiveContainer width={CHART_FULL_WIDTH} height={CHART_HEIGHT}>
        <AreaChart data={chartData} margin={CHART_MARGIN}>
          <CartesianGrid {...GRID_STYLES} vertical={true} horizontal={true} />

          <XAxis
            dataKey="date"
            interval={CHART_INTERVAL}
            tickFormatter={formatDate}
            tick={X_AXIS_TICK_STYLES}
            axisLine={X_AXIS_LINE}
            tickLine={false}
          />

          <YAxis
            domain={Y_AXIS_DOMAIN}
            ticks={Y_AXIS_TICKS}
            tick={Y_AXIS_TICK_STYLES}
            axisLine={false}
            tickLine={false}
            width={Y_AXIS_WIDTH}
          />

          <Area dataKey={EMPTY_DATA_KEY} stroke="none" fill="none" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
