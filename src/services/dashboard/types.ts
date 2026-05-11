type JobStatus = 'draft' | 'processing' | 'completed' | 'failed';

export interface Metrics {
  totalDocuments: number;
  entitiesDetected: number;
  averageConfidenceRate: number;
  syntheticRecords: number;
}

export interface ChartData {
  date: string;
  count: number;
}

export interface Job {
  id: string;
  document: string;
  status: JobStatus;
  framework: string | null;
  entities: number;
  date: string;
}

export interface DashboardData {
  metrics: Metrics;
  chartData: ChartData[];
  recentActivity: Job[];
}
