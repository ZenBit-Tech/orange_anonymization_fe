export const isWithinDateRange = (date: string, start: Date | null, end: Date | null) => {
  const current = new Date(date);

  if (start && current < start) return false;
  if (end && current > end) return false;

  return true;
};
