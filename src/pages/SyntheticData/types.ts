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
