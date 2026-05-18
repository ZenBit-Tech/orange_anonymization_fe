import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { useTheme } from '@mui/material';

import type { DistributionData } from '@/services/dashboard/types';

import {
  ChartContainer,
  ChartArea,
  LegendContainer,
  LegendItem,
  LegendDot,
  LegendText,
} from './styled';

import { formatComplianceName } from '@/utils/formatChartLabel';

interface Props {
  data: DistributionData[];
}

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  percent?: number;
  name?: string;
  index?: number;
}

const RADIAN = Math.PI / 180;
const OFFSET = 24;
const DEFAULT_OUTER_RADIUS = 90;
const DEFAULT_INNER_RADIUS = 65;
const LABEL_Y_OFFSET = 18;
const TEXT_GAP = 4;
const LABEL_FONT_SIZE = 12;
const LABEL_FONT_WEIGHT = 600;
const PERCENT_FONT_WEIGHT = 700;
const LABEL_STROKE_WIDTH = 1.5;
const TOP_RIGHT_MIN_ANGLE = 20;
const TOP_RIGHT_MAX_ANGLE = 90;
const TOP_OFFSET_MIN_ANGLE = 60;
const TOP_OFFSET_MAX_ANGLE = 120;
const BOTTOM_LINE_MIN_ANGLE = 240;
const BOTTOM_LINE_MAX_ANGLE = 320;
const TOP_RIGHT_X_OFFSET = 10;
const TOP_RIGHT_Y_OFFSET = 8;
const BOTTOM_EXTRA_LINE_LENGTH = 36;
const CHART_HEIGHT = 280;
const LEGEND_HEIGHT = 36;

const PIE_CHART_MARGIN = {
  top: 0,
  bottom: 0,
};

const getSmartYOffset = (angle: number) => {
  if (angle > TOP_OFFSET_MIN_ANGLE && angle < TOP_OFFSET_MAX_ANGLE) {
    return -18;
  }

  if (angle > 240 && angle < 300) {
    return 18;
  }

  return 0;
};

export const ComplianceChart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const chartConfig = useMemo(() => {
    if (!containerWidth) {
      return {
        outerRadius: DEFAULT_OUTER_RADIUS,
        innerRadius: DEFAULT_INNER_RADIUS,
        lineLength: 80,
      };
    }

    const availableWidth = containerWidth * 0.42;
    const outerRadius = Math.max(48, Math.min(DEFAULT_OUTER_RADIUS, availableWidth / 2));

    return {
      outerRadius,
      innerRadius: outerRadius * 0.72,
      lineLength: Math.max(32, containerWidth * 0.1),
    };
  }, [containerWidth]);

  const sortedData = useMemo(() => {
    const cloned = [...data];
    const swissIndex = cloned.findIndex((i) => i.name === 'Swiss FADP');
    const ukIndex = cloned.findIndex((i) => i.name === 'UK DPI');

    if (swissIndex !== -1 && ukIndex !== -1) {
      [cloned[swissIndex], cloned[ukIndex]] = [cloned[ukIndex], cloned[swissIndex]];
    }

    return cloned;
  }, [data]);

  const colors = useMemo<string[]>(
    () => [
      theme.palette.charts.compliance.hipaa ?? '',
      theme.palette.charts.compliance.gdpr ?? '',
      theme.palette.charts.compliance.ukDpi ?? '',
      theme.palette.charts.compliance.swissFadp ?? '',
    ],
    [theme],
  );

  const renderLabel = useCallback(
    (props: PieLabelProps) => {
      const {
        cx = 0,
        cy = 0,
        midAngle = 0,
        outerRadius = 0,
        percent = 0,
        name = '',
        index = 0,
      } = props;

      const color = colors[index % colors.length] ?? '';
      const angle = ((midAngle % 360) + 360) % 360;
      const yOffset = getSmartYOffset(angle);
      const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
      const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);
      const isTopRight = angle > TOP_RIGHT_MIN_ANGLE && angle < TOP_RIGHT_MAX_ANGLE;

      const mx = isTopRight
        ? sx + TOP_RIGHT_X_OFFSET
        : cx + (outerRadius + OFFSET) * Math.cos(-midAngle * RADIAN);

      const my = isTopRight
        ? sy - TOP_RIGHT_Y_OFFSET
        : cy + (outerRadius + OFFSET) * Math.sin(-midAngle * RADIAN) + yOffset;

      const isRight = mx > cx;
      const isBottom = angle > BOTTOM_LINE_MIN_ANGLE && angle < BOTTOM_LINE_MAX_ANGLE;
      const extraLineLength = isBottom ? BOTTOM_EXTRA_LINE_LENGTH : 0;

      const ex = isRight
        ? mx + chartConfig.lineLength + extraLineLength
        : mx - chartConfig.lineLength - extraLineLength;

      const lineCenterX = (mx + ex) / 2;
      const label = formatComplianceName(name);

      return (
        <g>
          <path
            d={`M ${sx},${sy} L ${mx},${my} L ${ex},${my}`}
            stroke={color}
            strokeWidth={LABEL_STROKE_WIDTH}
            fill="none"
          />

          <text
            x={lineCenterX}
            y={my - LABEL_Y_OFFSET - TEXT_GAP}
            textAnchor="middle"
            fontWeight={LABEL_FONT_WEIGHT}
            fontSize={LABEL_FONT_SIZE}
            fill={color}
          >
            {label}
          </text>

          <text
            x={lineCenterX}
            y={my - TEXT_GAP}
            textAnchor="middle"
            fontWeight={PERCENT_FONT_WEIGHT}
            fontSize={LABEL_FONT_SIZE}
            fill={color}
          >
            {Math.round(percent * 100)}%
          </text>
        </g>
      );
    },
    [chartConfig, colors],
  );

  return (
    <ChartContainer ref={containerRef} chartHeight={CHART_HEIGHT} legendHeight={LEGEND_HEIGHT}>
      <ChartArea>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={PIE_CHART_MARGIN}>
            <Pie
              data={sortedData}
              dataKey="count"
              cx="50%"
              cy="50%"
              innerRadius={chartConfig.innerRadius}
              outerRadius={chartConfig.outerRadius}
              stroke="none"
              labelLine={false}
              label={renderLabel}
            >
              {sortedData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartArea>

      <LegendContainer height={LEGEND_HEIGHT}>
        {sortedData.map((item, index) => (
          <LegendItem key={item.name}>
            <LegendDot color={colors[index % colors.length]} />

            <LegendText color={theme.palette.neutral[500] ?? ''}>
              {formatComplianceName(item.name)}
            </LegendText>
          </LegendItem>
        ))}
      </LegendContainer>
    </ChartContainer>
  );
};
