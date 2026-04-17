export const JobStatus = {
  DRAFT: 'draft',
  CONFIGURED: 'configured',
  QUEUED: 'queued',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export interface IComplianceFramework {
  id: number;
  slug: string;
  title: string;
  description: string;
  tag: string;
}

export interface HIPAAMethod {
  id: number;
  title: string;
  description: string;
  comment: string;
}

export interface JobInputData {
  fileName?: string;
  fileSize?: number;
  lineCount?: number;
}

export interface JobConfigSettings {
  language?: string;
  method?: string;
  entities?: string[];
  [key: string]: unknown;
}

export interface WizardState {
  currentStep: number;
  frameworkSelection: string | null;
  inputData: JobInputData | null;
  configSettings: JobConfigSettings;
  analysisMetadata?: Record<string, unknown>;
}

export interface IJob {
  id: string;
  status: JobStatus;
  userId: string;
  wizardState: WizardState | null;
  framework?: string;
  originalText?: string;
  anonymizedText?: string;
  processingTime?: number;
  errorMessage: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface EntityDetection {
  start: number;
  end: number;
  score: number;
  entity_type: string;
  analysis_explanation: string | null;
}

export interface JobMainContent {
  originalText: string;
  anonymizedText: string;
}

export interface JobTimestamps {
  started: string;
  finished: string;
}

export interface JobAuditTrail {
  jobId: string;
  framework: string;
  timestamps: JobTimestamps;
  processingTime: number;
}

export interface JobResults {
  mainContent: JobMainContent;
  entityTable: EntityDetection[];
  auditTrail: JobAuditTrail;
}
