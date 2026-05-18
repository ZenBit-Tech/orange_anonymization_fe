export const formatComplianceName = (value: string): string => {
  if (!value) return '';

  const map: Record<string, string> = {
    hipaa: 'HIPAA',
    gdpr: 'GDPR',
    'uk dpi': 'UK DPI',
    'swiss fadp': 'Swiss FADP',
    replace: 'Replace',
    mask: 'Mask',
    redact: 'Redact',
  };

  const normalized = value.toLowerCase();

  return map[normalized] ?? capitalizeWords(value);
};

const capitalizeWords = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
