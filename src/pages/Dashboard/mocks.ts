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

  recentActivity: Array.from({ length: 157 }, (_, index) => ({
    id: String(index + 1),
    fileName:
      index % 5 === 0
        ? 'extremely_long_document_name_to_test_overflow_behaviorrrrrrrrrrrrrrrrrrrrrrrrrrr.pdf'
        : `document_${index + 1}.pdf`,
    framework:
      index % 4 === 0
        ? 'hipaa'
        : index % 4 === 1
          ? 'gdpr'
          : index % 4 === 2
            ? 'swiss_fadp'
            : 'uk_dpi',
    status:
      index % 5 === 0
        ? 'succeeded'
        : index % 5 === 1
          ? 'failed'
          : index % 5 === 2
            ? 'queued'
            : index % 5 === 3
              ? 'processing'
              : 'draft',
    entitiesCount: index % 5 === 4 ? null : Math.floor(Math.random() * 100) + 1,
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
  })),

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
