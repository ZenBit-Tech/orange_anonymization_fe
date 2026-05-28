import React, { useMemo } from 'react';

import { CircularProgress, useTheme } from '@mui/material';
import { eachDayOfInterval, format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { DashboardState } from '@/pages/Dashboard/types';
import type { ChartData } from '@/services/dashboard/types';

import { CHART_CONSTANTS } from './constants';
import {
  CHART_MARGIN,
  ChartEmptyState,
  ChartErrorState,
  ChartLoaderWrapper,
  ChartWrapper,
  getGridStyles,
  getTooltipStyles,
  getXAxisLine,
  getXAxisTickStyles,
  getYAxisTickStyles,
} from './styled';
import { CHART_TYPES, type ChartType } from './types';
import { formatChartDate } from './utils';

interface ActivityChartProps {
  chartData: ChartData[];
  chartType: ChartType;
  startDate: Date;
  endDate: Date;
  state: DashboardState;
}

interface DotProps {
  cx?: number;
  cy?: number;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  chartData,
  chartType,
  startDate,
  endDate,
  state,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDocuments = chartType === CHART_TYPES.DOCUMENTS;
  const strokeColor = isDocuments ? theme.palette.primary[500] : theme.palette.accent[400];
  const dataKey = isDocuments ? CHART_TYPES.DOCUMENTS : CHART_TYPES.ENTITIES;

  const dataMap = useMemo(() => {
    const map = new Map<string, ChartData>();

    for (const item of chartData) {
      map.set(item.date, item);
    }

    return map;
  }, [chartData]);

  const normalizedData = useMemo(() => {
    const days = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return days.map((day) => {
      const key = format(day, CHART_CONSTANTS.DATE_FORMAT);
      const existing = dataMap.get(key);

      return {
        date: key,
        documents: existing?.documents ?? 0,
        entities: existing?.entities ?? 0,
      };
    });
  }, [dataMap, startDate, endDate]);

  const xAxisTicks = useMemo(() => {
    const total = normalizedData.length;
    const step = total <= 7 ? 1 : total <= 14 ? 2 : total <= 30 ? 4 : 7;

    return normalizedData.filter((_, i) => i % step === 0).map((d) => d.date);
  }, [normalizedData]);

  const isEmptyChart = useMemo(() => {
    return normalizedData.every((i) => (i[dataKey] ?? 0) === 0);
  }, [normalizedData, dataKey]);

  const maxValue = useMemo(() => {
    return Math.max(...normalizedData.map((i) => i[dataKey] ?? 0), 1);
  }, [normalizedData, dataKey]);

  const normalizedMax = useMemo(() => {
    return Math.max(
      Math.ceil(maxValue * CHART_CONSTANTS.CHART_SCALE_FACTOR),
      CHART_CONSTANTS.MIN_CHART_MAX,
    );
  }, [maxValue]);

  const renderChartDot =
    (innerRadius: number, opacity: number) =>
    ({ cx, cy }: DotProps) => {
      if (cx == null || cy == null) return null;

      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={CHART_CONSTANTS.DOT.OUTER_RADIUS}
            fill={strokeColor}
            opacity={opacity}
          />
          <circle
            cx={cx}
            cy={cy}
            r={innerRadius}
            fill={strokeColor}
            stroke={theme.palette.common.white}
            strokeWidth={CHART_CONSTANTS.DOT.STROKE_WIDTH}
          />
        </g>
      );
    };

  if (state === 'loading') {
    return (
      <ChartLoaderWrapper>
        <CircularProgress color="inherit" />
      </ChartLoaderWrapper>
    );
  }

  if (state === 'error') {
    return (
      <ChartWrapper>
        <ChartErrorState>{t('dashboard.errors.failedToLoadProcessingActivity')}</ChartErrorState>
      </ChartWrapper>
    );
  }

  if (isEmptyChart) {
    return (
      <ChartWrapper>
        <ChartEmptyState>{t('dashboard.chart.empty')}</ChartEmptyState>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={CHART_CONSTANTS.CHART_HEIGHT}>
        <AreaChart data={normalizedData} margin={CHART_MARGIN}>
          <defs>
            <linearGradient id={CHART_CONSTANTS.GRADIENT.ID} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={strokeColor}
                stopOpacity={CHART_CONSTANTS.GRADIENT.TOP_OPACITY}
              />
              <stop
                offset="100%"
                stopColor={strokeColor}
                stopOpacity={CHART_CONSTANTS.GRADIENT.BOTTOM_OPACITY}
              />
            </linearGradient>
          </defs>

          <CartesianGrid {...getGridStyles(theme)} vertical horizontal />

          <XAxis
            dataKey="date"
            ticks={xAxisTicks}
            tickFormatter={formatChartDate}
            tick={getXAxisTickStyles(theme)}
            axisLine={getXAxisLine(theme)}
            tickLine={false}
          />

          <YAxis
            domain={[0, normalizedMax]}
            tick={getYAxisTickStyles(theme)}
            axisLine={false}
            tickLine={false}
            width={CHART_CONSTANTS.Y_AXIS_WIDTH}
          />

          <Tooltip contentStyle={getTooltipStyles(theme)} />

          <Area
            type="linear"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={CHART_CONSTANTS.AREA_STROKE_WIDTH}
            fill={CHART_CONSTANTS.GRADIENT.FILL}
            dot={renderChartDot(CHART_CONSTANTS.DOT.INNER_RADIUS, CHART_CONSTANTS.DOT.OPACITY)}
            activeDot={renderChartDot(
              CHART_CONSTANTS.DOT.ACTIVE_INNER_RADIUS,
              CHART_CONSTANTS.DOT.ACTIVE_OPACITY,
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
