export const EMPTY_DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return d.toISOString().split('T')[0];
});

export const DATE_PAD_LENGTH = 2;
export const DATE_PAD_CHAR = '0';
export const DATE_LOCALE = 'en';
export const DATE_FORMAT_OPTIONS = { month: 'short' } as const;
export const EMPTY_CHART_VALUE = 0;
export const EMPTY_DATA_KEY = '_empty';
export const CHART_INTERVAL = 0;
export const X_AXIS_TICK_DY = 10;
export const CHART_FULL_WIDTH = '100%';
export const CHART_HEIGHT = 280;
export const GRID_STROKE_DASHARRAY = '4 3';
export const X_AXIS_STROKE_WIDTH = 1;

export const CHART_MARGIN = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};

export const Y_AXIS_TICKS = [0, 200, 400, 600, 800, 1000];
export const Y_AXIS_DOMAIN: [number, number] = [0, 1000];
export const Y_AXIS_WIDTH = 40;
