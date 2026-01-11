import { currentWeatherExternalFixture } from "../../../__fixtures__/weather/currentWeatherExternalFixture";
import { currentWeatherFixture } from "../../../__fixtures__/weather/currentWeatherFixture";
import currentWeatherMapper from "./CurrentWeatherMapper";

describe("CurrentWeatherMapper.ts", () => {
  it("should return the correct result", () => {
    const result = currentWeatherMapper.externalToEntity(
      currentWeatherExternalFixture
    );

    expect(result).toEqual(currentWeatherFixture);
  });
});
