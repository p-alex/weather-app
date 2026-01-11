export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DayOfTheWeekFullStrType = (typeof daysOfTheWeek)[number];

function extractFullDayOfTheWeekFromDate(date: Date): DayOfTheWeekFullStrType {
  return daysOfTheWeek[date.getDay()];
}

export default extractFullDayOfTheWeekFromDate;
