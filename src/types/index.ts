export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface AuthTokenPayload {
  token: string;
  user: User;
}

export interface PresidioEntity {
  entity_type: string;
  start: number;
  end: number;
  score: number;
  text?: string;
}

export interface AnonymizeResult {
  text: string;
  items: AnonymizedItem[];
}

export interface AnonymizedItem {
  operator: string;
  entity_type: string;
  start: number;
  end: number;
  text: string;
}

export type AnonymizationStrategy = 'replace' | 'redact' | 'hash' | 'encrypt' | 'synthetic';
export type ComplianceFramework = 'hipaa' | 'gdpr' | 'custom';

export interface DeIdentificationSettings {
  framework: ComplianceFramework;
  strategy: AnonymizationStrategy;
  entities: string[];
  language: string;
  minScore: number;
}

export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Document {
  id: string;
  userId: string;
  originalText: string;
  anonymizedText: string | null;
  status: DocumentStatus;
  entityCount: number;
  processingTimeMs: number | null;
  framework: ComplianceFramework;
  createdAt: string;
}

export interface SyntheticRecord {
  id: string;
  entityType: string;
  value: string;
  locale: string;
}

export interface SyntheticGenerationSettings {
  recordCount: number;
  entityTypes: string[];
  locale: string;
}

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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
