export const ComplianceFramework = {
  HIPAA: 'hipaa',
  EU_GDPR: 'eu-gdpr',
  UK_GDPR: 'uk-gdpr',
  SWISS_FADP: 'swiss-fadp',
} as const;

export type ComplianceFramework = (typeof ComplianceFramework)[keyof typeof ComplianceFramework];

export const Threshold = {
  HIGH: 0.7,
  MIDDLE: 0.5,
  LOW: 0.3,
} as const;

export type Threshold = (typeof Threshold)[keyof typeof Threshold];

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
  slug: ComplianceFramework;
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
  strategies?: Record<string, string>;
  [key: string]: unknown;
}

export interface WizardState {
  currentStep: number;
  frameworkSelection: ComplianceFramework | null;
  inputData: JobInputData | null;
  configSettings: JobConfigSettings;
  analysisMetadata?: Record<string, unknown>;
}

export interface IJob {
  id: string;
  status: JobStatus;
  userId: string;
  wizardState: WizardState | null;
  framework?: ComplianceFramework;
  anonymizedText?: string;
  processingTime?: number;
  errorMessage: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface EntityDetection {
  id: string;
  start: number;
  end: number;
  score: number;
  entity_type: string;
  analysis_explanation: string | null;
  isExcluded?: boolean;
}

export interface JobMainContent {
  anonymizedText: string;
}

export interface JobTimestamps {
  started: string;
  finished: string;
}

export interface JobAuditTrail {
  jobId: string;
  framework: ComplianceFramework;
  timestamps: JobTimestamps;
  processingTime: number;
}

export interface JobResults {
  mainContent: JobMainContent;
  entityTable: EntityDetection[];
  auditTrail: JobAuditTrail;
  stats: {
    detected: number;
    processed: number;
    avgConfidence: number;
  };
}

export interface Language {
  code: string;
  name: string;
  isAutoDetected?: boolean;
}

export type HIPAAMethodUI = Omit<HIPAAMethod, 'description' | 'comment'> & {
  titleKey: string;
  descKey: string;
  commentKey: string;
};

export interface RedactOption {
  id: string;
  category: string;
  categoryLabel: string;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
}
