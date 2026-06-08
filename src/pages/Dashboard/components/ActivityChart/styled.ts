import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

import { BORDERS } from '@/theme';

import { CHART_CONSTANTS } from './constants';

const X_AXIS_TICK_DY = 10;
const GRID_STROKE_DASHARRAY = '4 3';
const X_AXIS_STROKE_WIDTH = 1;

const CHART_MARGIN_TOP = 10;
const CHART_MARGIN_RIGHT = 20;
const CHART_MARGIN_LEFT = 0;
const CHART_MARGIN_BOTTOM = 0;

export const CHART_MARGIN = {
  top: CHART_MARGIN_TOP,
  right: CHART_MARGIN_RIGHT,
  left: CHART_MARGIN_LEFT,
  bottom: CHART_MARGIN_BOTTOM,
};

export const getTooltipStyles = (theme: Theme) => ({
  borderRadius: theme.spacing(1.5),
  border: `${BORDERS.card}px solid ${theme.palette.neutral[200]}`,
  boxShadow: theme.customShadows.sm,
  backgroundColor: theme.palette.common.white,
});

export const ControlsGroup = styled(RadioGroup)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(2),
}));

export const ControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  gap: theme.spacing(0.5),

  '& .MuiFormControlLabel-label': {
    ...theme.typography.labelMd,
    color: theme.palette.neutral[500],
    transition: 'color 0.2s ease',
  },

  '& .Mui-checked ~ .MuiFormControlLabel-label': {
    color: theme.palette.primary[500],
  },
}));

export const ControlRadio = styled(Radio)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.neutral[400],

  '&.Mui-checked': {
    color: theme.palette.primary[500],
  },
}));

export const ChartWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const getGridStyles = (theme: Theme) => ({
  strokeDasharray: GRID_STROKE_DASHARRAY,
  stroke: theme.palette.neutral[200],
});

export const getXAxisLine = (theme: Theme) => ({
  strokeWidth: X_AXIS_STROKE_WIDTH,
  stroke: theme.palette.neutral[200],
});

export const getXAxisTickStyles = (theme: Theme) => ({
  fontWeight: theme.typography.labelSm.fontWeight,
  fontSize: theme.typography.labelSm.fontSize,
  lineHeight: theme.typography.labelSm.lineHeight,
  fill: theme.palette.neutral[500],
  dy: X_AXIS_TICK_DY,
});

export const getYAxisTickStyles = (theme: Theme) => ({
  fontWeight: theme.typography.labelSm.fontWeight,
  fontSize: theme.typography.labelSm.fontSize,
  lineHeight: theme.typography.labelSm.lineHeight,
  fill: theme.palette.neutral[500],
});

export const ChartEmptyState = styled(Box)(({ theme }) => ({
  ...theme.typography.labelMd,
  height: CHART_CONSTANTS.CHART_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.neutral[500],
}));

export const ChartErrorState = styled(Box)(({ theme }) => ({
  ...theme.typography.labelMd,
  height: CHART_CONSTANTS.CHART_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.error.main,
}));

export const ChartLoaderWrapper = styled(Box)(({ theme }) => ({
  height: CHART_CONSTANTS.CHART_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
}));
