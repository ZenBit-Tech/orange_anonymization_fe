import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';

import { useTheme } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import type { DistributionData } from '@/services/dashboard/types';

import { Wrapper, ShowMoreButton, ShowMoreContainer } from './styled';

interface Props {
  data: DistributionData[];
}

const COLLAPSED_ITEMS_COUNT = 7;
const BAR_SIZE = 16;
const BAR_GAP = 24;
const MAX_DOMAIN = 250;
const GRID_STROKE_WIDTH = 1;
const GRID_DASH_ARRAY = '3 3';
const Y_AXIS_WIDTH = 110;
const ROW_HEIGHT = 32;
const BAR_RADIUS: [number, number, number, number] = [0, 4, 4, 0];

const CHART_MARGIN = {
  top: 20,
  right: 0,
  left: -20,
  bottom: 0,
};

const TICKS = [0, 50, 100, 150, 200, 250];

const ALL_ENTITY_TYPES = [
  'PERSON',
  'DATE_TIME',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'LOCATION',
  'US_SSN',
  'MEDICAL_RECORD_NUMBER',
  'ORGANIZATION',
  'IP_ADDRESS',
  'DEVICE_ID',
  'US_PASSPORT',
  'NATIONAL_ID',
  'CREDIT_CARD',
  'IBAN_CODE',
  'GEOPOINT',
  'BIOMETRIC',
  'PHOTO',
  'FREE_TEXT',
] as const;

const generateHorizontalCoordinates = (height: number, itemsCount: number, topOffset: number) => {
  const step = height / itemsCount;

  return Array.from({ length: itemsCount + 1 }, (_, index) => topOffset + step * index);
};

export const EntityTypesChart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const showAllLabel = t('dashboard.entityTypesChart.showAll', {
    count: ALL_ENTITY_TYPES.length,
  });

  const showLessLabel = t('dashboard.entityTypesChart.showLess');

  const normalizedData = useMemo(() => {
    return ALL_ENTITY_TYPES.map((key) => {
      const found = data.find((d) => d.key === key);

      return {
        name: t(`dashboard.entityTypesChart.labels.${key}`, key),
        count: found?.count ?? 0,
      };
    });
  }, [data, t]);

  const visibleData = useMemo(
    () => (expanded ? normalizedData : normalizedData.slice(0, COLLAPSED_ITEMS_COUNT)),
    [expanded, normalizedData],
  );

  const chartHeight = useMemo(() => {
    return visibleData.length * ROW_HEIGHT + 40;
  }, [visibleData.length]);

  if (!data.length) return null;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={visibleData}
          layout="vertical"
          margin={CHART_MARGIN}
          barCategoryGap={BAR_GAP}
        >
          <CartesianGrid
            vertical
            stroke={theme.palette.charts.grid}
            strokeDasharray={GRID_DASH_ARRAY}
            horizontalCoordinatesGenerator={({ offset }) =>
              generateHorizontalCoordinates(offset.height, visibleData.length, offset.top)
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
            fill={theme.palette.charts.entityBar}
            radius={BAR_RADIUS}
            barSize={BAR_SIZE}
          />
        </BarChart>
      </ResponsiveContainer>

      {normalizedData.length > COLLAPSED_ITEMS_COUNT && (
        <ShowMoreContainer>
          <ShowMoreButton onClick={handleToggle}>
            {expanded ? (
              <>
                {showLessLabel}
                <KeyboardArrowUpIcon />
              </>
            ) : (
              <>
                {showAllLabel}
                <KeyboardArrowDownIcon />
              </>
            )}
          </ShowMoreButton>
        </ShowMoreContainer>
      )}
    </Wrapper>
  );
};
