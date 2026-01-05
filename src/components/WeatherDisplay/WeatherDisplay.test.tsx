import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { GET_LOCATION_DATA_BASE_URL } from "../../api/infrastructure/api/getLocationData";
import { GET_WEATHER_DATA_BASE_URL } from "../../api/infrastructure/api/getWeatherData";
import { getLocationDataExternalResponseFixture } from "../../__fixtures__/location/getLocationDataResponseFixture";
import { getWeatherDataExternalResponseFixture } from "../../__fixtures__/weather/getWeatherDataExternalResponseFixture";
import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";
import UnitsContextProvider from "../../context/UnitsContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import locationExternalFixture from "../../__fixtures__/location/locationExternalFixture";

const server = setupServer(
  http.get(GET_LOCATION_DATA_BASE_URL, () => {
    return HttpResponse.json(getLocationDataExternalResponseFixture);
  }),
  http.get(GET_WEATHER_DATA_BASE_URL, () => {
    return HttpResponse.json(getWeatherDataExternalResponseFixture);
  })
);

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UnitsContextProvider>{children}</UnitsContextProvider>
    </QueryClientProvider>
  );
}

describe("WeatherDisplay.tsx", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display weather data container after location search", async () => {
    render(<WeatherDisplay />, { wrapper });

    const input = screen.getByPlaceholderText("Search for a place...");

    await userEvent.type(input, "tokyo");

    const searchButton = screen.getByRole("button", { name: "Search" });

    await userEvent.click(searchButton);

    const searchResult = screen.getByRole("button", {
      name: `${locationExternalFixture.name}, ${locationExternalFixture.country}`,
    });

    await userEvent.click(searchResult);

    const weatherDataContainer = screen.getByTestId("weather-data-container");

    expect(weatherDataContainer).toBeInTheDocument();
  });
});
