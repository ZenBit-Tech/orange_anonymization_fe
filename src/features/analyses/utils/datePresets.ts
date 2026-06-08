export const getDateRangeByPreset = (preset: string) => {
  const now = new Date();

  switch (preset) {
    case 'today': {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      return { start, end: now };
    }

    case '7days': {
      const start = new Date();
      start.setDate(now.getDate() - 7);

      return { start, end: now };
    }

    case '30days': {
      const start = new Date();
      start.setDate(now.getDate() - 30);

      return { start, end: now };
    }

    default:
      return { start: null, end: null };
  }
};
