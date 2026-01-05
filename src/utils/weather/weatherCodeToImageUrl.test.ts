import { describe, it, expect } from "vitest";
import weatherCodeToImageUrl from "./weatherCodeToImageUrl";

describe("weatherCodeToImageUrl.ts", () => {
  it("returns sunny icon for clear sky", () => {
    expect(weatherCodeToImageUrl(0)).toBe("/images/icon-sunny.webp");
  });

  it("returns partly cloudy icon for mainly clear and partly cloudy", () => {
    expect(weatherCodeToImageUrl(1)).toBe("/images/icon-partly-cloudy.webp");
    expect(weatherCodeToImageUrl(2)).toBe("/images/icon-partly-cloudy.webp");
  });

  it("returns overcast icon for overcast sky", () => {
    expect(weatherCodeToImageUrl(3)).toBe("/images/icon-overcast.webp");
  });

  it("returns fog icon for fog weather codes", () => {
    expect(weatherCodeToImageUrl(45)).toBe("/images/icon-fog.webp");
    expect(weatherCodeToImageUrl(48)).toBe("/images/icon-fog.webp");
  });

  it("returns drizzle icon for drizzle and freezing drizzle", () => {
    [51, 53, 55, 56, 57].forEach((code) => {
      expect(weatherCodeToImageUrl(code)).toBe("/images/icon-drizzle.webp");
    });
  });

  it("returns rain icon for rain and rain showers", () => {
    [61, 63, 65, 66, 67, 80, 81, 82].forEach((code) => {
      expect(weatherCodeToImageUrl(code)).toBe("/images/icon-rain.webp");
    });
  });

  it("returns snow icon for snow-related weather codes", () => {
    [71, 73, 75, 77, 85, 86].forEach((code) => {
      expect(weatherCodeToImageUrl(code)).toBe("/images/icon-snow.webp");
    });
  });

  it("returns storm icon for thunderstorm-related weather codes", () => {
    [95, 96, 99].forEach((code) => {
      expect(weatherCodeToImageUrl(code)).toBe("/images/icon-storm.webp");
    });
  });

  it("returns undefined for unknown weather codes", () => {
    expect(weatherCodeToImageUrl(999)).toBeUndefined();
    expect(weatherCodeToImageUrl(-1)).toBeUndefined();
  });
});
