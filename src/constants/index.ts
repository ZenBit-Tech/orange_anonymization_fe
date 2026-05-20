import type { Language } from '@/pages/DeIdentify/types';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';
export const AUTH_TOKEN_KEY = 'clinical_studio_token';
export const AUTH_USER_KEY = 'clinical_studio_user';
export const AUTH_SESSION_STARTED_AT_KEY = 'clinical_studio_session_started_at';
export const AUTH_SESSION_MAX_AGE_MS = 60 * 60 * 1000;

export const ROUTES = {
  LANDING: '/',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  AUTH: '/auth/*',
  VERIFY_BASE: '/auth/verify',
  INACTIVITY: '/inactivity',
  SESSION_EXPIRED: '/session-expired',
  TOKEN: '/auth/verify/token/:token',
  DASHBOARD: '/app',
  DE_IDENTIFY: '/app/de-identify',
  SYNTHETIC_DATA: '/app/synthetic-data',
  SYNTHETIC_RESULTS: '/app/synthetic-data/:syntheticId',
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 64,
  h4: 22,
  h3: 28,
  h2: 36,
  h1: 48,
} as const;

export const LINE_HEIGHTS = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const;

export const RECENTLY_USED: Language[] = [
  { code: 'es', name: 'languages.es' },
  { code: 'en', name: 'languages.en' },
  { code: 'de', name: 'languages.de' },
];

export const ALL_LANGUAGES: Language[] = [
  { code: 'ar', name: 'languages.ar' },
  { code: 'bn', name: 'languages.bn' },
  { code: 'zh', name: 'languages.zh' },
  { code: 'zh-TW', name: 'languages.zh-TW' },
  { code: 'cs', name: 'languages.cs' },
  { code: 'da', name: 'languages.da' },
  { code: 'nl', name: 'languages.nl' },
  { code: 'en', name: 'languages.en' },
  { code: 'fi', name: 'languages.fi' },
  { code: 'fr', name: 'languages.fr' },
  { code: 'de', name: 'languages.de' },
  { code: 'el', name: 'languages.el' },
  { code: 'he', name: 'languages.he' },
  { code: 'hi', name: 'languages.hi' },
  { code: 'hu', name: 'languages.hu' },
  { code: 'id', name: 'languages.id' },
  { code: 'it', name: 'languages.it' },
  { code: 'ja', name: 'languages.ja' },
  { code: 'ko', name: 'languages.ko' },
  { code: 'no', name: 'languages.no' },
  { code: 'pl', name: 'languages.pl' },
  { code: 'pt', name: 'languages.pt' },
  { code: 'ro', name: 'languages.ro' },
  { code: 'ru', name: 'languages.ru' },
  { code: 'sk', name: 'languages.sk' },
  { code: 'es', name: 'languages.es' },
  { code: 'sv', name: 'languages.sv' },
  { code: 'th', name: 'languages.th' },
  { code: 'tr', name: 'languages.tr' },
  { code: 'uk', name: 'languages.uk' },
  { code: 'vi', name: 'languages.vi' },
];

export const ITEM_TO_ENTITY_MAP: Record<string, string> = {
  'deIdentify.settings.identifiers.items.names': 'NAME',
  'deIdentify.settings.identifiers.items.dates': 'DATE',
  'deIdentify.settings.identifiers.items.fax': 'FAX',
  'deIdentify.settings.identifiers.items.email': 'EMAIL',
  'deIdentify.settings.identifiers.items.phone': 'PHONE',
  'deIdentify.settings.identifiers.items.geographic': 'ZIP',
  'deIdentify.settings.identifiers.items.address': 'ADDRESS',
  'deIdentify.settings.identifiers.items.ssn': 'SSN',
  'deIdentify.settings.identifiers.items.account': 'ACCOUNT',
  'deIdentify.settings.identifiers.items.medical': 'MRN',
  'deIdentify.settings.identifiers.items.health': 'HEALTH_PLAN',
  'deIdentify.settings.identifiers.items.beneficiary': 'BENEFICIARY',
  'deIdentify.settings.identifiers.items.ip': 'IP',
  'deIdentify.settings.identifiers.items.device': 'DEVICE',
  'deIdentify.settings.identifiers.items.url': 'URL',
  'deIdentify.settings.identifiers.items.fingerprints': 'BIOMETRIC',
  'deIdentify.settings.identifiers.items.photos': 'PHOTO',
  'deIdentify.settings.identifiers.items.vehicle': 'VEHICLE',
  'deIdentify.settings.identifiers.items.certificate': 'CERTIFICATE',
};

export const IDENTIFIER_GROUPS = [
  {
    title: 'deIdentify.settings.identifiers.groups.personal',
    items: [
      'deIdentify.settings.identifiers.items.names',
      'deIdentify.settings.identifiers.items.dates',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.contact',
    items: [
      'deIdentify.settings.identifiers.items.fax',
      'deIdentify.settings.identifiers.items.email',
      'deIdentify.settings.identifiers.items.phone',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.location',
    items: [
      'deIdentify.settings.identifiers.items.address',
      'deIdentify.settings.identifiers.items.geographic',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.financial',
    items: [
      'deIdentify.settings.identifiers.items.ssn',
      'deIdentify.settings.identifiers.items.account',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.medical',
    items: [
      'deIdentify.settings.identifiers.items.medical',
      'deIdentify.settings.identifiers.items.health',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.technical',
    items: [
      'deIdentify.settings.identifiers.items.ip',
      'deIdentify.settings.identifiers.items.device',
      'deIdentify.settings.identifiers.items.url',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.biometric',
    items: [
      'deIdentify.settings.identifiers.items.fingerprints',
      'deIdentify.settings.identifiers.items.photos',
      'deIdentify.settings.identifiers.items.vehicle',
      'deIdentify.settings.identifiers.items.certificate',
    ],
  },
];

export const DEFAULT_STRATEGIES: Record<string, string> = {
  PERSON: 'Replace',
  ORGANIZATION: 'Mask',
  LOCATION: 'Generalise',
  DATE: 'Generalise',
  IP: 'Generalise',
  GEOPOINT: 'Generalise',
  NATIONAL_ID: 'Redact',
  ID_NUMBER: 'Redact',
  PASSPORT: 'Redact',
  CREDIT_CARD: 'Redact',
  BANK_ACCOUNT: 'Redact',
  EMAIL: 'Redact',
  PHONE: 'Redact',
  BIOLOGICAL_DATA: 'Redact',
  PHOTO: 'Redact',
  MEDICAL_RECORD_NUMBER: 'Pseudonymise',
  DEVICE_ID: 'Hash',
  FREE_TEXT: 'NLP',
};
