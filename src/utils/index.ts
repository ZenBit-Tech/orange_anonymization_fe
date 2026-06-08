import type { EntityDetection } from '@/pages/DeIdentify/types';
import { theme } from '@/theme';

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

export function formatScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function entityColor(entityType: string): string {
  return (
    (theme.palette.entities as Record<string, string>)[entityType] ?? theme.palette.entities.DEFAULT
  );
}

export function extractSpan(text: string, start: number, end: number): string {
  return text.slice(start, end);
}

export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoString));
}

export function downloadAsFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','));
  return [headers.join(','), ...lines].join('\n');
}

export const getUniqueEntities = (entities: EntityDetection[]): EntityDetection[] => {
  return Array.from(new Map(entities.map((item) => [item.entity_type, item])).values());
};

export const presidioToHipaaMap: Record<string, string> = {
  PERSON: 'BENEFICIARY',
  DATE_TIME: 'DATE',
  US_SSN: 'CERTIFICATE',
  PHONE_NUMBER: 'FAX',
  EMAIL_ADDRESS: 'EMAIL',
  LOCATION: 'ZIP',
  URL: 'URL',
  IP_ADDRESS: 'DEVICE',
  US_DRIVER_LICENSE: 'LICENSE',
  US_PASSPORT: 'VEHICLE',
  BIOMETRIC: 'BIOMETRIC',
  PHOTO: 'PHOTO',
  IBAN_CODE: 'ACCOUNT',
  MEDICAL_RECORD_NUMBER: 'MRN',
  US_HEALTH_NUMBER: 'HEALTH_PLAN',
};
