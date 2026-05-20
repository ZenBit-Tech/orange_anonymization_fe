export type JobStatus = 'draft' | 'configured' | 'queued' | 'processing' | 'succeeded' | 'failed';

export interface Metrics {
  totalDocuments: number;
  entitiesDetected: number;
  anonymizationRate: number;
  syntheticRecords: number;
}

export interface ChartData {
  date: string;
  documents: number;
  entities: number;
}

export interface DistributionData {
  key: string;
  count: number;
}

export interface RecentActivity {
  id: string;
  framework: string | null;
  status: JobStatus;
  createdAt: string;
  fileName: string;
  entitiesCount: number | null;
}

export interface DashboardData {
  metrics: Metrics;
  chartData: ChartData[];
  recentActivity: RecentActivity[];
  strategiesDistribution: DistributionData[];
  frameworksDistribution: DistributionData[];
  entitiesDistribution: DistributionData[];
  emptyState?: boolean;
  startDate?: string;
  endDate?: string;
  message?: string;
}
