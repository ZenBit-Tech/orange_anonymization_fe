export const formatComplianceName = (value: string): string => {
  if (!value) return '';

  const map: Record<string, string> = {
    hipaa: 'HIPAA',
    gdpr: 'EU GDPR',
    uk_dpi: 'UK DPI',
    swiss_fadp: 'Swiss FADP',
  };

  const normalized = value.trim().toLowerCase();

  return map[normalized] ?? capitalizeWords(value);
};

const capitalizeWords = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
