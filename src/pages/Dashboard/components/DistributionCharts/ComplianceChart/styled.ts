import { Box, Typography, styled } from '@mui/material';
interface ChartContainerProps {
  chartHeight: number;
  legendHeight: number;
}
interface LegendContainerProps {
  height: number;
}
interface LegendDotProps {
  color: string;
}
interface LegendTextProps {
  color: string;
}
const LEGEND_DOT_SIZE = 8;
export const ChartContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'chartHeight' && prop !== 'legendHeight',
})<ChartContainerProps>(({ chartHeight, legendHeight }) => ({
  width: '100%',
  height: chartHeight + legendHeight,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
}));
export const ChartArea = styled(Box)({ flex: 1 });
export const LegendContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'height',
})<LegendContainerProps>(({ theme, height }) => ({
  height,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2.5),
}));
export const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
}));
export const LegendDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LegendDotProps>(({ color }) => ({
  width: LEGEND_DOT_SIZE,
  height: LEGEND_DOT_SIZE,
  borderRadius: '50%',
  backgroundColor: color,
}));
export const LegendText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LegendTextProps>(({ theme, color }) => ({
  ...theme.typography.labelSm,
  color,
  whiteSpace: 'nowrap',
}));
