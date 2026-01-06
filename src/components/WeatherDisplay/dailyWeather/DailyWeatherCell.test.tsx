import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import DailyWeatherCell from "./DailyWeatherCell";
import { metricUnitsFixture } from "../../../__fixtures__/units/unitsFixture";

vi.mock("../../../hooks/useDisplayTemperature", () => ({
  default: () => (temp: number) => temp,
}));

vi.mock("../../../utils/weather/weatherCodeToImageUrl", () => ({
  default: () => "/test-icon.webp",
}));

describe("DailyWeatherCell.tsx", () => {
  it("renders date, temperatures, and weather icon", () => {
    render(
      <DailyWeatherCell
        units={metricUnitsFixture}
        dailyWeather={{
          date: "2026-01-06",
          weatherCode: 0,
          maxTemperature: 10,
          minTemperature: 5,
        }}
      />
    );

    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("10°")).toBeInTheDocument();
    expect(screen.getByText("5°")).toBeInTheDocument();

    const img = screen.getByRole("presentation");
    expect(img).toHaveAttribute("src", "/test-icon.webp");
  });
});
