import { render, screen } from "@testing-library/react";
import DailyWeatherSection from "./DailyWeatherSection";
import { metricUnitsFixture } from "../../../__fixtures__/units/unitsFixture";
import { dailyWeatherFixture } from "../../../__fixtures__/weather/dailyWeatherFixture";
import type { IDailyWeather } from "../../../api/domain/entities/IDailyWeather";

describe("DailyWeatherSection.tsx", () => {
  it("should display 7 empty weather cells if dailyWeather data provided is null", () => {
    render(<DailyWeatherSection dailyWeather={null} units={metricUnitsFixture} />);

    const cells = screen.getAllByTestId("daily-weather-cell-placeholder");

    expect(cells).toHaveLength(7);
  });

  it("should display weather cells if dailyWeather data provided is not null", () => {
    const dailyWeather: IDailyWeather[] = [
      {
        ...dailyWeatherFixture,
        date: "1",
        maxTemperature: 8,
        minTemperature: 1,
      },
      {
        ...dailyWeatherFixture,
        date: "2",
        maxTemperature: 9,
        minTemperature: 2,
      },
      {
        ...dailyWeatherFixture,
        date: "3",
        maxTemperature: 10,
        minTemperature: 3,
      },
      {
        ...dailyWeatherFixture,
        date: "4",
        maxTemperature: 11,
        minTemperature: 4,
      },
      {
        ...dailyWeatherFixture,
        date: "5",
        maxTemperature: 12,
        minTemperature: 5,
      },
      {
        ...dailyWeatherFixture,
        date: "6",
        maxTemperature: 13,
        minTemperature: 6,
      },
      {
        ...dailyWeatherFixture,
        date: "7",
        maxTemperature: 14,
        minTemperature: 7,
      },
    ];
    render(<DailyWeatherSection dailyWeather={dailyWeather} units={metricUnitsFixture} />);

    dailyWeather.forEach(({ minTemperature, maxTemperature }) => {
      const maxTemp = screen.getByText(new RegExp(`\\b${maxTemperature}\\b`, "i"));
      const minTemp = screen.getByText(new RegExp(`\\b${minTemperature}\\b`, "i"));

      expect(minTemp).toBeInTheDocument();
      expect(maxTemp).toBeInTheDocument();
    });
  });
});
