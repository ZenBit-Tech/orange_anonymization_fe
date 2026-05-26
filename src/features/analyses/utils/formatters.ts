import dayjs from 'dayjs';

export const formatFramework = (value: string): string => {
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

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatDateRangeLabel = (date: Date): string => dayjs(date).format('DD MMM');
export const formatDateInput = (date: Date): string => dayjs(date).format('D/MM/YYYY');

const capitalizeWords = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
