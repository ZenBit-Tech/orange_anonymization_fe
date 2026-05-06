import type { JobStatus } from './Dashboard.const';

export interface Metrics {
  totalDocuments: number;
  entitiesDetected: number;
  anonymizationRate: number;
  syntheticRecords: number;
}

export interface ChartData {
  date: string;
  count: number | string;
}

export interface Job {
  id: string;
  document: string;
  status: JobStatus;
  framework: string;
  entities: number;
  date: string;
}

export interface DashboardData {
  metrics: Metrics;
  chartData: ChartData[];
  recentActivity: Job[];
  message?: string;
  emptyState?: boolean;
}
