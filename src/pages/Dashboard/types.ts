import { type Document } from '../DeIdentify/types';

export interface DashboardMetrics {
  totalDocuments: number;
  entitiesDetected: number;
  anonymizationRate: number;
  syntheticRecords: number;
}

export interface ActivityDataPoint {
  date: string;
  documents: number;
  entities: number;
}

export interface EntityDistributionItem {
  entityType: string;
  count: number;
  percentage: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  activityChart: ActivityDataPoint[];
  entityDistribution: EntityDistributionItem[];
  recentDocuments: Document[];
}
