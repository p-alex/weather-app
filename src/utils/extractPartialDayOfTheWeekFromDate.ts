export const partialDaysOfTheWeek = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export type PartialDayOfTheWeekStrType = (typeof partialDaysOfTheWeek)[number];

function extractPartialDayOfTheWeekFromDate(
  date: string
): PartialDayOfTheWeekStrType {
  const dateObj = new Date(date);
  return partialDaysOfTheWeek[dateObj.getDay()];
}

export default extractPartialDayOfTheWeekFromDate;
