type JobStatus = 'draft' | 'configured' | 'queued' | 'processing' | 'succeeded' | 'failed';

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
  name: string;
  count: number;
}

export interface RecentActivity {
  id: string;
  framework: string;
  status: JobStatus;
  createdAt: string;
  fileName: string;
  entitiesCount: number;
}

export interface DashboardData {
  metrics: Metrics;
  chartData: ChartData[];
  recentActivity: RecentActivity[];
  strategiesDistribution: DistributionData[];
  frameworksDistribution: DistributionData[];
  entitiesDistribution: DistributionData[];
  emptyState?: boolean;
  message?: string;
  startDate?: string;
  endDate?: string;
}
