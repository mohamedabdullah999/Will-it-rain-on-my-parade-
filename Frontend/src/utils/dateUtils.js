export function generateDates(startYear, endYear) {
  const dates = new Set();
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);

  let current = new Date(start);
  while (current <= end) {
    const isoDate = current.toISOString().split("T")[0];
    dates.add(isoDate);
    current.setDate(current.getDate() + 1);
  }

  return Array.from(dates);
}
