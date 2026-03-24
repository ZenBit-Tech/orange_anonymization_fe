export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3000';
export const AUTH_TOKEN_KEY = 'clinical_studio_token';
export const AUTH_USER_KEY = 'clinical_studio_user';

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',
  DASHBOARD: '/app/dashboard',
  DE_IDENTIFY: '/app/de-identify',
  SYNTHETIC_DATA: '/app/synthetic-data',
} as const;

export const PRESIDIO_ENTITIES = [
  'PERSON',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'US_SSN',
  'US_DRIVER_LICENSE',
  'US_PASSPORT',
  'CREDIT_CARD',
  'IBAN_CODE',
  'IP_ADDRESS',
  'LOCATION',
  'DATE_TIME',
  'NRP',
  'MEDICAL_LICENSE',
  'URL',
] as const;

export type PresidioEntityType = (typeof PRESIDIO_ENTITIES)[number];

export const ANONYMIZATION_STRATEGIES = [
  'replace',
  'redact',
  'hash',
  'encrypt',
  'synthetic',
] as const;
export type AnonymizationStrategy = (typeof ANONYMIZATION_STRATEGIES)[number];

export const HIPAA_ENTITIES: PresidioEntityType[] = [
  'PERSON',
  'DATE_TIME',
  'PHONE_NUMBER',
  'LOCATION',
  'EMAIL_ADDRESS',
  'US_SSN',
  'MEDICAL_LICENSE',
  'US_PASSPORT',
  'US_DRIVER_LICENSE',
];

export const PRESIDIO_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
] as const;

export const DATE_FORMAT = 'MMM d, yyyy';
export const DATETIME_FORMAT = 'MMM d, yyyy HH:mm';

export const DEFAULT_PAGE_SIZE = 20;
