import { render, screen } from "@testing-library/react";
import locationFixture from "../../../__fixtures__/location/locationEntityFixture";
import { currentWeatherFixture } from "../../../__fixtures__/weather/currentWeatherFixture";
import CurrentWeatherSection from "./CurrentWeatherSection";
import {
  imperialUnitsFixture,
  metricUnitsFixture,
} from "../../../__fixtures__/units/unitsFixture";

describe("CurrentWeatherSection.tsx", () => {
  it("should display weather data correctly based on metric units", async () => {
    render(
      <CurrentWeatherSection
        currentWeather={currentWeatherFixture}
        currentLocation={locationFixture}
        units={metricUnitsFixture}
        isLoading={false}
      />
    );

    const temperature = screen.getByText(
      `${currentWeatherFixture.temperature}°`
    );

    const humidity = screen.getByText(`${currentWeatherFixture.humidity}%`);

    const windSpeed = screen.getByText(
      `${Math.round(currentWeatherFixture.windSpeed)} km/h`
    );

    const precipitation = screen.getByText(
      `${currentWeatherFixture.precipitation.toFixed(1)} mm`
    );

    expect(temperature).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(windSpeed).toBeInTheDocument();
    expect(precipitation).toBeInTheDocument();
  });

  it("should display weather data correctly based on imperial units", async () => {
    render(
      <CurrentWeatherSection
        currentWeather={currentWeatherFixture}
        currentLocation={locationFixture}
        units={imperialUnitsFixture}
        isLoading={false}
      />
    );

    const temperature = screen.getByText(
      `${Math.floor(currentWeatherFixture.temperature * 1.8 + 32)}°`
    );

    const humidity = screen.getByText(`${currentWeatherFixture.humidity}%`);

    const windSpeed = screen.getByText(
      `${Math.floor(currentWeatherFixture.windSpeed / 1.609344)} mph`
    );

    const precipitation = screen.getByText(
      `${(currentWeatherFixture.precipitation / 25.4).toFixed(1)} in`
    );

    expect(temperature).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(windSpeed).toBeInTheDocument();
    expect(precipitation).toBeInTheDocument();
  });

  it("should show loading message inside the banner if data is loading", () => {
    render(
      <CurrentWeatherSection
        currentWeather={currentWeatherFixture}
        currentLocation={locationFixture}
        units={imperialUnitsFixture}
        isLoading={true}
      />
    );

    const loadingMessage = screen.getByText("Loading...");

    expect(loadingMessage).toBeInTheDocument();
  });

  it("should show '-' in each weather cell if data is loading", () => {
    render(
      <CurrentWeatherSection
        currentWeather={currentWeatherFixture}
        currentLocation={locationFixture}
        units={imperialUnitsFixture}
        isLoading={true}
      />
    );

    const cellValues = screen.getAllByText("-");

    expect(cellValues).toHaveLength(4);
  });

  it("should display nothing inside the banner if weather data is null", () => {
    render(
      <CurrentWeatherSection
        currentWeather={null}
        currentLocation={locationFixture}
        units={imperialUnitsFixture}
        isLoading={false}
      />
    );

    const banner = screen.getByTestId("weather-banner");

    expect(banner.children).toHaveLength(0);
  });

  it("should display '-' inside weather cells if weather data is null", () => {
    render(
      <CurrentWeatherSection
        currentWeather={null}
        currentLocation={locationFixture}
        units={imperialUnitsFixture}
        isLoading={false}
      />
    );

    const cellValues = screen.getAllByText("-");

    expect(cellValues).toHaveLength(4);
  });
});
