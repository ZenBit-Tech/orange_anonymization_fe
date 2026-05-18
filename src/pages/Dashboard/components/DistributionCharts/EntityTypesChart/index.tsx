import React, { useMemo, useState } from 'react';

import { ResponsiveContainer, BarChart } from 'recharts';

import { useTheme } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import type { DistributionData } from '@/services/dashboard/types';

import {
  Wrapper,
  ShowMoreButton,
  ShowMoreContainer,
  StyledCartesianGrid,
  StyledXAxis,
  StyledYAxis,
  StyledBar,
} from './styled';

interface Props {
  data: DistributionData[];
}

const COLLAPSED_ITEMS_COUNT = 6;
const ROW_HEIGHT = 30;
const CHART_HEIGHT_COLLAPSED = 260;
const CHART_HEIGHT_EXPANDED_MIN = 600;
const BAR_CATEGORY_GAP = 24;
const X_AXIS_DOMAIN: [number, number] = [0, 250];
const X_AXIS_TICKS = [0, 50, 100, 150, 200, 250];
const Y_AXIS_WIDTH = 180;
const BAR_SIZE = 16;
const BAR_RADIUS: [number, number, number, number] = [0, 4, 4, 0];

const CHART_MARGIN = {
  top: 20,
  right: 16,
  left: 0,
  bottom: 8,
};

const SHOW_MORE_BUTTON_LABELS = {
  showLess: 'Show less',
  showAll: (count: number) => `Show all ${count} entity types`,
};

export const EntityTypesChart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);

  const visibleData = useMemo(
    () => (expanded ? data : data.slice(0, COLLAPSED_ITEMS_COUNT)),
    [data, expanded],
  );

  const chartHeight = useMemo(() => {
    return expanded
      ? Math.max(CHART_HEIGHT_EXPANDED_MIN, visibleData.length * ROW_HEIGHT)
      : CHART_HEIGHT_COLLAPSED;
  }, [expanded, visibleData.length]);

  if (!data.length) return null;

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={visibleData}
          layout="vertical"
          margin={CHART_MARGIN}
          barCategoryGap={BAR_CATEGORY_GAP}
        >
          <StyledCartesianGrid
            vertical
            stroke={theme.palette.charts.grid}
            strokeDasharray="3 3"
            horizontalCoordinatesGenerator={({ offset }) => {
              const step = offset.height / visibleData.length;

              return Array.from(
                { length: visibleData.length + 1 },
                (_, index) => offset.top + step * index,
              );
            }}
          />

          <StyledXAxis
            type="number"
            orientation="top"
            domain={X_AXIS_DOMAIN}
            ticks={X_AXIS_TICKS}
            tickLine={false}
            axisLine={{
              stroke: theme.palette.charts.grid,
            }}
            tick={{
              fontWeight: theme.typography.labelSm.fontWeight,
              fontSize: theme.typography.labelSm.fontSize,
              lineHeight: theme.typography.labelSm.lineHeight,
              fill: theme.palette.neutral[500],
            }}
          />

          <StyledYAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={{
              stroke: theme.palette.charts.grid,
            }}
            width={Y_AXIS_WIDTH}
            tick={{
              fontWeight: theme.typography.labelSm.fontWeight,
              fontSize: theme.typography.labelSm.fontSize,
              lineHeight: theme.typography.labelSm.lineHeight,
              fill: theme.palette.neutral[500],
            }}
          />

          <StyledBar
            dataKey="count"
            fill={theme.palette.charts.entityBar}
            radius={BAR_RADIUS}
            barSize={BAR_SIZE}
          />
        </BarChart>
      </ResponsiveContainer>

      {data.length > COLLAPSED_ITEMS_COUNT && (
        <ShowMoreContainer>
          <ShowMoreButton onClick={handleToggle}>
            {expanded ? (
              <>
                {SHOW_MORE_BUTTON_LABELS.showLess}
                <KeyboardArrowUpIcon />
              </>
            ) : (
              <>
                {SHOW_MORE_BUTTON_LABELS.showAll(data.length)}
                <KeyboardArrowDownIcon />
              </>
            )}
          </ShowMoreButton>
        </ShowMoreContainer>
      )}
    </Wrapper>
  );
};
