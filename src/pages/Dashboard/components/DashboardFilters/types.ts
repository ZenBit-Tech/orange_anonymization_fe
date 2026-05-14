export const FRAMEWORK_VALUES = {
  ALL: 'all',
  HIPAA: 'hipaa',
  GDPR: 'gdpr',
  FADP: 'fadp',
  UK_DPI: 'uk_dpi',
} as const;

export type FrameworkValue = (typeof FRAMEWORK_VALUES)[keyof typeof FRAMEWORK_VALUES];
