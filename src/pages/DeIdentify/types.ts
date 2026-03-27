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
