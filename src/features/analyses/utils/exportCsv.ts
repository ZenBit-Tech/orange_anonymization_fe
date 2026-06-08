import type { RecentActivity } from '@/services/dashboard/types';

const CSV_SEPARATOR = ';';

const escapeCsvValue = (value: unknown): string => {
  const stringValue = String(value ?? '');

  return `"${stringValue.replace(/"/g, '""')}"`;
};

const formatDate = (date: string | null | undefined): string => {
  if (!date) {
    return '';
  }

  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();

  return `${day}.${month}.${year}`;
};

export const exportAnalysesToCsv = (rows: RecentActivity[]) => {
  const headers = ['Document', 'Status', 'Framework', 'Entities', 'Date'];

  const csvRows = rows.map((row) => [
    escapeCsvValue(row.fileName || '-'),
    escapeCsvValue(row.status || '-'),
    escapeCsvValue(row.framework || '-'),
    escapeCsvValue(row.entitiesCount ?? '-'),
    escapeCsvValue(formatDate(row.createdAt) || '-'),
  ]);

  const csvContent = [headers.map(escapeCsvValue), ...csvRows]
    .map((row) => row.join(CSV_SEPARATOR))
    .join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'analyses.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
