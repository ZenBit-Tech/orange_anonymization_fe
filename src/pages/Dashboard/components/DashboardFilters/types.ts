export const FRAMEWORK_VALUES = {
  ALL: 'all',
  HIPAA: 'hipaa',
  GDPR: 'gdpr',
  FADP: 'swiss_fadp',
  UK_DPI: 'uk_dpi',
} as const;

export type FrameworkValue = (typeof FRAMEWORK_VALUES)[keyof typeof FRAMEWORK_VALUES];

export const FRAMEWORK_API_VALUES: Record<FrameworkValue, string | undefined> = {
  [FRAMEWORK_VALUES.ALL]: undefined,
  [FRAMEWORK_VALUES.HIPAA]: 'hipaa',
  [FRAMEWORK_VALUES.GDPR]: 'gdpr',
  [FRAMEWORK_VALUES.FADP]: 'swiss-fadp',
  [FRAMEWORK_VALUES.UK_DPI]: 'uk-gdpr',
};
