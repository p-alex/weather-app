type SupportedDateType = string | Date | number;

export const daysFullStr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DaysFullStr = typeof daysFullStr;

export const monthsFullStr = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type MonthsFullStr = typeof monthsFullStr;

export class DatePartsExtractor {
  getMeridiem = (date: SupportedDateType) => {
    const parsedDate = this._parseDate(date);
    const hours = parsedDate.getHours();
    return hours >= 12 ? "PM" : "AM";
  };

  getHour = (date: SupportedDateType, type: "12Hr" | "24Hr") => {
    const parsedDate = this._parseDate(date);
    const hours = parsedDate.getHours();
    if (type === "24Hr") return hours;
    if (hours === 0) return 12;
    if (hours > 12) return hours - 12;
    return hours;
  };

  getDay = (
    date: SupportedDateType,
    { leadingZero = false }: { leadingZero?: boolean } = {}
  ) => {
    const parsedDate = this._parseDate(date);
    const day = parsedDate.getDate();
    return leadingZero ? this._addLeadingZero(day) : day;
  };

  getDayFullText = (date: SupportedDateType): DaysFullStr[number] => {
    const parsedDate = this._parseDate(date);
    return daysFullStr[parsedDate.getDay()];
  };

  getDayPartialText = (date: SupportedDateType) => {
    const parsedDate = this._parseDate(date);
    return daysFullStr[parsedDate.getDay()].slice(0, 3);
  };

  getMonth = (
    date: SupportedDateType,
    { leadingZero = false }: { leadingZero?: boolean } = {}
  ) => {
    const parsedDate = this._parseDate(date);
    if (leadingZero) return this._addLeadingZero(parsedDate.getMonth() + 1);
    return parsedDate.getMonth() + 1;
  };

  getMonthFullText = (date: SupportedDateType): MonthsFullStr[number] => {
    const parsedDate = this._parseDate(date);
    return monthsFullStr[parsedDate.getMonth()];
  };

  getMonthPartialText = (date: SupportedDateType) => {
    const parsedDate = this._parseDate(date);
    return monthsFullStr[parsedDate.getMonth()].slice(0, 3);
  };

  getYear = (date: SupportedDateType) => {
    const parsedDate = this._parseDate(date);
    return parsedDate.getFullYear();
  };

  private readonly _parseDate = (date: SupportedDateType) => {
    if (date instanceof Date) return date;
    return new Date(date);
  };

  private _addLeadingZero(value: number) {
    const doesValueHaveTwoDigits =
      Math.floor(Math.log10(Math.abs(value))) + 1 === 2;
    if (doesValueHaveTwoDigits) return value;
    return "0" + value;
  }
}

const datePartsExtractor = new DatePartsExtractor();

export default datePartsExtractor;
