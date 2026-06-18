export const monthsBetween = (later: Date, earlier: Date): number => {
  const yearDiff = later.getFullYear() - earlier.getFullYear();
  const monthDiff = later.getMonth() - earlier.getMonth();
  const dayAdjust = later.getDate() < earlier.getDate() ? 1 : 0;
  return Math.max(0, yearDiff * 12 + monthDiff - dayAdjust);
};

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export const computeGapRatios = (dates: Date[]): number[] => {
  if (dates.length <= 1) return dates.map(() => 0);

  const gaps: number[] = [];
  for (let i = 0; i < dates.length - 1; i++) {
    gaps.push(monthsBetween(dates[i], dates[i + 1]));
  }

  if (gaps.length === 0) return dates.map(() => 0);

  const min = Math.min(...gaps);
  const max = Math.max(...gaps);
  const range = max - min;

  const ratios = gaps.map((g) => {
    if (range === 0) return 0.5;
    return easeOutCubic((g - min) / range);
  });

  return [0, ...ratios];
};
