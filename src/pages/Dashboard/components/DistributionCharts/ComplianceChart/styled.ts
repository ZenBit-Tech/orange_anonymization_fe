import { Box, Typography, styled } from '@mui/material';

interface LegendDotProps {
  color: string;
}

interface LegendTextProps {
  color: string;
}

const LEGEND_DOT_SIZE = 8;
const CHART_MAX_WIDTH = 700;
const CHART_HEIGHT_DEFAULT = 'clamp(260px, 45vw, 300px)';
const CHART_HEIGHT_BREAKPOINT_899 = 320;
const CHART_HEIGHT_SM = 260;
const BREAKPOINT_899 = 899;
const LEGEND_TEXT_FONT_SIZE = 'clamp(10px, 1.8vw, 12px)';

export const ChartContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
  gap: theme.spacing(0.5),
  overflow: 'visible',
}));

export const ChartArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
  width: '100%',
  maxWidth: CHART_MAX_WIDTH,
  height: CHART_HEIGHT_DEFAULT,

  [theme.breakpoints.down(BREAKPOINT_899)]: {
    height: CHART_HEIGHT_BREAKPOINT_899,
  },

  [theme.breakpoints.down('sm')]: {
    height: CHART_HEIGHT_SM,
  },
}));

export const LegendContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.5, 1),
  paddingInline: theme.spacing(1),
  boxSizing: 'border-box',
  minWidth: 0,
}));

export const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  flex: 1,
  minWidth: 0,
  justifyContent: 'center',
}));

export const LegendDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LegendDotProps>(({ color }) => ({
  width: LEGEND_DOT_SIZE,
  height: LEGEND_DOT_SIZE,
  minWidth: LEGEND_DOT_SIZE,
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}));

export const LegendText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LegendTextProps>(({ theme, color }) => ({
  ...theme.typography.labelSm,
  color,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  lineHeight: theme.typography.h1.lineHeight,
  fontSize: LEGEND_TEXT_FONT_SIZE,
  minWidth: 0,
}));
