import type { DashboardData } from '@/services/dashboard/types';

export const MOCK_DASHBOARD_DATA: DashboardData = {
  metrics: {
    totalDocuments: 128,
    entitiesDetected: 4821,
    anonymizationRate: 98,
    syntheticRecords: 340,
  },

  chartData: [
    {
      date: '2026-05-01',
      documents: 12,
      entities: 240,
    },
    {
      date: '2026-05-05',
      documents: 18,
      entities: 420,
    },
    {
      date: '2026-05-10',
      documents: 24,
      entities: 610,
    },
    {
      date: '2026-05-15',
      documents: 30,
      entities: 820,
    },
    {
      date: '2026-05-20',
      documents: 44,
      entities: 1200,
    },
  ],

  recentActivity: [
    {
      id: '1',
      fileName: 'patients_data.csv',
      framework: 'hipaa',
      status: 'succeeded',
      entitiesCount: 15,
      createdAt: '2026-05-20T10:00:00Z',
    },
    {
      id: '2',
      fileName: 'clinical_notes.txt',
      framework: 'gdpr',
      status: 'failed',
      entitiesCount: 8,
      createdAt: '2026-05-19T10:00:00Z',
    },
    {
      id: '3',
      fileName: 'insurance_records.pdf',
      framework: 'swiss_fadp',
      status: 'queued',
      entitiesCount: 22,
      createdAt: '2026-05-18T10:00:00Z',
    },
    {
      id: '4',
      fileName: 'uk_citizens_registry.xlsx',
      framework: 'uk_dpi',
      status: 'processing',
      entitiesCount: 31,
      createdAt: '2026-05-17T10:00:00Z',
    },
    {
      id: '5',
      fileName: 'draft_document.docx',
      framework: null,
      status: 'draft',
      entitiesCount: null,
      createdAt: '2026-05-16T10:00:00Z',
    },
  ],

  strategiesDistribution: [
    { key: 'Redact', count: 230 },
    { key: 'Replace', count: 210 },
    { key: 'Mask', count: 180 },
    { key: 'Hash', count: 155 },
    { key: 'Generalise', count: 125 },
    { key: 'Pseudonymise', count: 98 },
    { key: 'Synthetic', count: 58 },
    { key: 'NLP', count: 8 },
  ],

  frameworksDistribution: [
    {
      key: 'hipaa',
      count: 52,
    },
    {
      key: 'gdpr',
      count: 34,
    },
    {
      key: 'swiss_fadp',
      count: 18,
    },
    {
      key: 'uk_dpi',
      count: 24,
    },
  ],

  entitiesDistribution: [
    { key: 'PERSON', count: 225 },
    { key: 'DATE_TIME', count: 218 },
    { key: 'EMAIL_ADDRESS', count: 210 },
    { key: 'PHONE_NUMBER', count: 198 },
    { key: 'LOCATION', count: 190 },
    { key: 'US_SSN', count: 180 },
    { key: 'MEDICAL_RECORD_NUMBER', count: 172 },
    { key: 'ORGANIZATION', count: 158 },
    { key: 'IP_ADDRESS', count: 151 },
    { key: 'DEVICE_ID', count: 150 },
    { key: 'US_PASSPORT', count: 130 },
    { key: 'NATIONAL_ID', count: 125 },
    { key: 'CREDIT_CARD', count: 118 },
    { key: 'IBAN_CODE', count: 84 },
    { key: 'GEOPOINT', count: 70 },
    { key: 'BIOMETRIC', count: 45 },
    { key: 'PHOTO', count: 12 },
    { key: 'FREE_TEXT', count: 4 },
  ],

  emptyState: false,

  startDate: '2026-05-01T00:00:00Z',

  endDate: '2026-05-21T00:00:00Z',
};
