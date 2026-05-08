import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { theme } from '@/theme';

const X_AXIS_TICK_DY = 10;
const GRID_STROKE_DASHARRAY = '4 3';
const X_AXIS_STROKE_WIDTH = 1;

export const ChartWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const GRID_STYLES = {
  strokeDasharray: GRID_STROKE_DASHARRAY,
  stroke: theme.palette.neutral[200],
};

export const X_AXIS_LINE = {
  strokeWidth: X_AXIS_STROKE_WIDTH,
  stroke: theme.palette.neutral[200],
};

export const X_AXIS_TICK_STYLES = {
  fontWeight: theme.typography.labelSm.fontWeight,
  fontSize: theme.typography.labelSm.fontSize,
  lineHeight: theme.typography.labelSm.lineHeight,
  fill: theme.palette.neutral[500],
  dy: X_AXIS_TICK_DY,
};

export const Y_AXIS_TICK_STYLES = {
  fontWeight: theme.typography.labelSm.fontWeight,
  fontSize: theme.typography.labelSm.fontSize,
  lineHeight: theme.typography.labelSm.lineHeight,
  fill: theme.palette.neutral[500],
};
