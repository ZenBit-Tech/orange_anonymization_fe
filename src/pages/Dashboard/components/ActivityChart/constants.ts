import { CHART_RANGES } from './types';

export const CHART_CONSTANTS = {
  DEFAULT_RANGE: CHART_RANGES.DAYS_7,

  CHART_HEIGHT: 320,
  Y_AXIS_WIDTH: 40,
  AREA_STROKE_WIDTH: 1.5,

  CHART_SCALE_FACTOR: 1.3,
  MIN_CHART_MAX: 5,

  DATE_FORMAT: 'yyyy-MM-dd',

  LOCALE: {
    ENGLISH: 'en',
  },

  MONTH_FORMAT: {
    SHORT: 'short',
  },

  GRADIENT: {
    ID: 'chartGradient',
    FILL: 'url(#chartGradient)',
    TOP_OPACITY: 0.3,
    BOTTOM_OPACITY: 0.05,
  },

  DOT: {
    OUTER_RADIUS: 8,
    INNER_RADIUS: 4,
    ACTIVE_INNER_RADIUS: 5,
    STROKE_WIDTH: 1,
    OPACITY: 0.15,
    ACTIVE_OPACITY: 0.2,
  },
} as const;
