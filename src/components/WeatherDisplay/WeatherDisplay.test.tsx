import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { GET_LOCATION_DATA_BASE_URL } from "../../api/infrastructure/api/getLocationData";
import { GET_WEATHER_DATA_BASE_URL } from "../../api/infrastructure/api/getWeatherData";
import { getLocationDataExternalResponseFixture } from "../../__fixtures__/location/getLocationDataExternalResponseFixture";
import { getWeatherDataExternalResponseFixture } from "../../__fixtures__/weather/getWeatherDataExternalResponseFixture";
import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";
import UnitsContextProvider from "../../context/UnitsContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import locationExternalFixture from "../../__fixtures__/location/locationExternalFixture";
import locationFixture from "../../__fixtures__/location/locationEntityFixture";

const server = setupServer(
  http.get(GET_LOCATION_DATA_BASE_URL, () => {
    return HttpResponse.json(getLocationDataExternalResponseFixture);
  }),
  http.get(GET_WEATHER_DATA_BASE_URL, () => {
    return HttpResponse.json(getWeatherDataExternalResponseFixture);
  })
);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <UnitsContextProvider>{children}</UnitsContextProvider>
      </QueryClientProvider>
    );
  };
}

async function handleSearch() {
  const input = screen.getByPlaceholderText("Search for a place...");

  await userEvent.type(input, "tokyo");

  const searchButton = screen.getByRole("button", { name: "Search" });

  await userEvent.click(searchButton);

  const searchResult = screen.getByRole("button", {
    name: `${locationExternalFixture.name}, ${locationExternalFixture.country}`,
  });

  await userEvent.click(searchResult);
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
    render(<WeatherDisplay />, { wrapper: createWrapper() });

    await handleSearch();

    const weatherDataContainer = screen.getByTestId("weather-data-container");

    expect(weatherDataContainer).toBeInTheDocument();
  });

  it("should display error messages and a retry button if 'get weather' request fails", async () => {
    server.use(
      http.get(
        GET_WEATHER_DATA_BASE_URL,
        () => new HttpResponse(null, { status: 500, type: "error" })
      )
    );

    render(<WeatherDisplay />, { wrapper: createWrapper() });

    await handleSearch();

    const heading = await screen.findByText("Something went wrong");
    const message = await screen.findByText(/failed/i);
    const retryButton = await screen.findByRole("button", { name: /retry/i });

    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(retryButton).toBeInTheDocument();
  });

  it("should retry request if retry button is pressed after 'get weather' request fails", async () => {
    server.use(
      http.get(
        GET_WEATHER_DATA_BASE_URL,
        () => new HttpResponse(null, { status: 500, type: "error" })
      )
    );

    render(<WeatherDisplay />, { wrapper: createWrapper() });

    await handleSearch();

    server.use(
      http.get(GET_WEATHER_DATA_BASE_URL, () =>
        HttpResponse.json(getWeatherDataExternalResponseFixture)
      )
    );

    const retryButton = screen.getByRole("button", { name: /retry/i });

    await userEvent.click(retryButton);

    expect(
      screen.getByText(`${locationFixture.name}, ${locationFixture.country}`)
    ).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });
});
