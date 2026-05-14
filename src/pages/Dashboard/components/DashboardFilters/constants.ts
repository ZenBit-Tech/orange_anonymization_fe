import { FRAMEWORK_VALUES } from './types';

export const FRAMEWORK_OPTIONS = [
  {
    value: FRAMEWORK_VALUES.ALL,
    translationKey: 'dashboard.filters.allFrameworks',
  },
  {
    value: FRAMEWORK_VALUES.HIPAA,
    translationKey: 'dashboard.filters.hipaa',
  },
  {
    value: FRAMEWORK_VALUES.GDPR,
    translationKey: 'dashboard.filters.gdpr',
  },
  {
    value: FRAMEWORK_VALUES.FADP,
    translationKey: 'dashboard.filters.fadp',
  },
  {
    value: FRAMEWORK_VALUES.UK_DPI,
    translationKey: 'dashboard.filters.ukDpi',
  },
] as const;
