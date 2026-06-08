export const CHART_TYPES = {
  DOCUMENTS: 'documents',
  ENTITIES: 'entities',
} as const;

export type ChartType = (typeof CHART_TYPES)[keyof typeof CHART_TYPES];

export const CHART_RANGES = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  DAYS_7: '7d',
  DAYS_14: '14d',
  DAYS_30: '30d',
  MONTHS_3: '3m',
  MONTHS_6: '6m',
  CUSTOM: 'custom',
} as const;

export type Range = (typeof CHART_RANGES)[keyof typeof CHART_RANGES];
