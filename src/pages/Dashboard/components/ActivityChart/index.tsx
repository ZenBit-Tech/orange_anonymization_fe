import React, { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { eachDayOfInterval, format, startOfDay, subDays, subMonths } from 'date-fns';
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

import type { ChartData } from '@/services/dashboard/types';

import { CHART_CONSTANTS } from './constants';
import {
  CHART_MARGIN,
  ChartEmptyState,
  ChartErrorState,
  ChartWrapper,
  getGridStyles,
  getTooltipStyles,
  getXAxisLine,
  getXAxisTickStyles,
  getYAxisTickStyles,
} from './styled';
import { CHART_RANGES, CHART_TYPES, type ChartType, type Range } from './types';
import { formatChartDate } from './utils';

interface ActivityChartProps {
  chartData: ChartData[];
  chartType: ChartType;
  range?: Range;
  error?: boolean;
}

interface DotProps {
  cx?: number;
  cy?: number;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  chartData,
  chartType,
  range = CHART_CONSTANTS.DEFAULT_RANGE,
  error = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDocuments = chartType === CHART_TYPES.DOCUMENTS;
  const strokeColor = isDocuments ? theme.palette.primary[500] : theme.palette.accent[400];
  const dataKey = isDocuments ? CHART_TYPES.DOCUMENTS : CHART_TYPES.ENTITIES;

  const { from, to } = useMemo(() => {
    const now = new Date();

    switch (range) {
      case CHART_RANGES.TODAY:
        return {
          from: startOfDay(now),
          to: startOfDay(now),
        };
      case CHART_RANGES.YESTERDAY: {
        const yesterday = startOfDay(subDays(now, 1));
        return {
          from: yesterday,
          to: yesterday,
        };
      }
      case CHART_RANGES.DAYS_14:
        return {
          from: subDays(now, 13),
          to: now,
        };
      case CHART_RANGES.DAYS_30:
        return {
          from: subDays(now, 29),
          to: now,
        };
      case CHART_RANGES.MONTHS_3:
        return {
          from: subMonths(now, 3),
          to: now,
        };
      case CHART_RANGES.MONTHS_6:
        return {
          from: subMonths(now, 6),
          to: now,
        };
      case CHART_RANGES.CUSTOM:
        return {
          from: subDays(now, 6),
          to: now,
        };
      case CHART_RANGES.DAYS_7:
      default:
        return {
          from: subDays(now, 6),
          to: now,
        };
    }
  }, [range]);

  const dataMap = useMemo(() => {
    const map = new Map<string, ChartData>();

    chartData.forEach((item) => {
      map.set(item.date, item);
    });

    return map;
  }, [chartData]);

  const normalizedData = useMemo(() => {
    const days = eachDayOfInterval({ start: from, end: to });

    return days.map((day) => {
      const formattedDate = format(day, CHART_CONSTANTS.DATE_FORMAT);
      const existingData = dataMap.get(formattedDate);

      return {
        date: formattedDate,
        documents: existingData?.documents ?? null,
        entities: existingData?.entities ?? null,
      };
    });
  }, [dataMap, from, to]);

  const xAxisTicks = useMemo(() => {
    const data = normalizedData;
    const total = data.length;

    if (range === CHART_RANGES.DAYS_7 || range === CHART_RANGES.DAYS_14) {
      return data.map((i) => i.date);
    }

    if (range === CHART_RANGES.DAYS_30) {
      const step = Math.ceil(total / 8);
      return data.filter((_, i) => i % step === 0).map((i) => i.date);
    }

    if (range === CHART_RANGES.MONTHS_3) {
      const step = Math.ceil(total / 10);
      return data.filter((_, i) => i % step === 0).map((i) => i.date);
    }

    if (range === CHART_RANGES.MONTHS_6) {
      const step = Math.ceil(total / 12);
      return data.filter((_, i) => i % step === 0).map((i) => i.date);
    }

    return data.map((i) => i.date);
  }, [normalizedData, range]);

  const isEmptyChart = useMemo(() => {
    return normalizedData.every((item) => (item[dataKey] ?? 0) === 0);
  }, [normalizedData, dataKey]);

  const maxValue = useMemo(() => {
    const values = normalizedData.map((item) => item[dataKey] ?? 0);
    return Math.max(...values, 1);
  }, [dataKey, normalizedData]);

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

  if (error) {
    return (
      <ChartWrapper>
        <ChartErrorState>{t('dashboard.chart.error')}</ChartErrorState>
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
