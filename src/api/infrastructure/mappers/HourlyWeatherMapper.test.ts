import { hourlyWeatherExternalFixture } from "../../../__fixtures__/weather/hourlyWeatherExternalFixture";
import { hourlyWeatherFixture } from "../../../__fixtures__/weather/hourlyWeatherFixture";
import AppException from "../../exceptions/AppException";
import hourlyWeatherMapper from "./HourlyWeatherMapper";

describe("HourlyWeatherMapper.ts", () => {
  it("should throw AppException if external hourly data array lengths do not match", () => {
    try {
      hourlyWeatherMapper.externalToEntity({
        ...hourlyWeatherExternalFixture,
        temperature_2m: [],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppException);
    }
  });

  it("should return correctly if data is supported", () => {
    const result = hourlyWeatherMapper.externalToEntity(
      hourlyWeatherExternalFixture
    );

    expect(result).toEqual([hourlyWeatherFixture]);
  });
});
