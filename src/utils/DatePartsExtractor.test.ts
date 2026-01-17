import { describe, it, expect } from "vitest";
import { DatePartsExtractor, daysFullStr, monthsFullStr } from "./DatePartsExtractor";

describe("DatePartsExtractor", () => {
  const extractor = new DatePartsExtractor();

  // Fixed date: Sunday, 5 March 2023, 14:09:07
  let date: Date;

  beforeEach(() => {
    date = new Date("2023-03-05T14:09:07");
  });

  describe("getMeridiem", () => {
    it("returns AM for morning hours", () => {
      const d = new Date("2023-03-05T09:00:00");
      expect(extractor.getMeridiem(d)).toBe("AM");
    });

    it("returns PM for afternoon hours", () => {
      expect(extractor.getMeridiem(date)).toBe("PM");
    });

    it("returns PM for 12:00", () => {
      const d = new Date("2023-03-05T12:00:00");
      expect(extractor.getMeridiem(d)).toBe("PM");
    });
  });

  describe("getHour", () => {
    it("returns 24-hour format correctly", () => {
      expect(extractor.getHour(date, "24Hr")).toBe(14);
    });

    it("returns 12-hour format correctly for PM", () => {
      expect(extractor.getHour(date, "12Hr")).toBe(2);
    });

    it("returns 12 for midnight in 12-hour format", () => {
      const d = new Date("2023-03-05T00:15:00");
      expect(extractor.getHour(d, "12Hr")).toBe(12);
    });

    it("returns 12 for noon in 12-hour format", () => {
      const d = new Date("2023-03-05T12:15:00");
      expect(extractor.getHour(d, "12Hr")).toBe(12);
    });
  });

  describe("getDay", () => {
    it("returns day of month as number", () => {
      expect(extractor.getDay(date)).toBe(5);
    });

    it("returns day of month with leading zero", () => {
      expect(extractor.getDay(date, { leadingZero: true })).toBe("05");
    });
  });

  describe("getDayFullText", () => {
    it("returns full weekday name", () => {
      expect(extractor.getDayFullText(date)).toBe(daysFullStr[0]); // Sunday
    });
  });

  describe("getDayPartialText", () => {
    it("returns abbreviated weekday name", () => {
      expect(extractor.getDayPartialText(date)).toBe("Sun");
    });
  });

  describe("getMonth", () => {
    it("returns month number (1-based)", () => {
      expect(extractor.getMonth(date)).toBe(3);
    });

    it("returns month number with leading zero", () => {
      expect(extractor.getMonth(date, { leadingZero: true })).toBe("03");
    });
  });

  describe("getMonthFullText", () => {
    it("returns full month name", () => {
      expect(extractor.getMonthFullText(date)).toBe(monthsFullStr[2]); // March
    });
  });

  describe("getMonthPartialText", () => {
    it("returns abbreviated month name", () => {
      expect(extractor.getMonthPartialText(date)).toBe("Mar");
    });
  });

  describe("getYear", () => {
    it("returns full year", () => {
      expect(extractor.getYear(date)).toBe(2023);
    });
  });

  describe("string date input", () => {
    it("accepts ISO date strings", () => {
      const result = extractor.getYear("2023-03-05T14:09:07");
      expect(result).toBe(2023);
    });
  });

  describe("leading zero", () => {
    it("returns value with no leading zero if leadingZero is set to false", () => {
      expect(extractor.getDay(date, { leadingZero: false })).toBe(5);
    });

    it("return no leading zero even if leading zero is set to true if value is greater or equal to 10", () => {
      date = new Date("2023-03-25T14:09:07");
      expect(extractor.getDay(date, { leadingZero: true })).toBe(25);
    });
  });
});
