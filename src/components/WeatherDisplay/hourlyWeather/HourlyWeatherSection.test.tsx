import { render, screen, within, waitFor } from "@testing-library/react";
import HourlyWeatherSection from "./HourlyWeatherSection";
import { hourlyWeatherFixture } from "../../../__fixtures__/weather/hourlyWeatherFixture";
import { daysFullStr } from "../../../utils/DatePartsExtractor";
import UnitsContextProvider from "../../../context/UnitsContextProvider";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import locationFixture from "../../../__fixtures__/location/locationEntityFixture";
import type { IHourlyWeather } from "../../../api/domain/entities/IHourlyWeather";

vi.spyOn(Date, "now").mockReturnValue(
  new Date("2026-01-15T15:48:17+02:00").getTime() // Thursday
);

const hours = Array.from({ length: 24 }, (_, i) => i);

function wrapper({ children }: { children: React.ReactNode }) {
  return <UnitsContextProvider>{children}</UnitsContextProvider>;
}

function makeTestData() {
  const baseDate = new Date("2026-01-15T01:00:00+02:00"); // Thursday
  const result: IHourlyWeather[] = [];

  daysFullStr.forEach((_, dayIndex) => {
    hours.forEach((hour) => {
      result.push({
        ...hourlyWeatherFixture,
        date: new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate() + dayIndex,
          hour
        ).toISOString(),
      });
    });
  });

  return result;
}

const testData = makeTestData();

describe("HourlyWeatherSection", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollTo = vi.fn();
    Window.prototype.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows '-' in dropdown toggle when loading", () => {
    render(
      <HourlyWeatherSection hourlyWeather={null} currentLocation={locationFixture} isLoading />,
      { wrapper }
    );

    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
  });

  it("renders 24 loading skeletons when loading", () => {
    render(
      <HourlyWeatherSection hourlyWeather={testData} currentLocation={locationFixture} isLoading />,
      { wrapper }
    );

    expect(screen.getAllByTestId("cell-loading-skeleton")).toHaveLength(24);
  });

  it("scrolls current hour cell into view on initial render", async () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    await waitFor(() => {
      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
        block: "start",
      });
    });
  });

  it("scrolls list to top when a non-current day is selected", async () => {
    const user = userEvent.setup();

    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    await user.click(screen.getByRole("button", { name: /thursday/i }));
    await user.click(screen.getByRole("button", { name: /friday/i }));

    await waitFor(() => {
      expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({ top: 0 });
    });
  });

  it("reorders days starting from the current day", async () => {
    const user = userEvent.setup();

    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    await user.click(screen.getByRole("button", { name: /thursday/i }));

    const dropdown = screen.getByTestId("days-dropdown");
    const buttons = within(dropdown).getAllByRole("button");

    expect(buttons.map((b) => b.textContent)).toEqual([
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
    ]);
  });

  it("closes dropdown after selecting a day", async () => {
    const user = userEvent.setup();

    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    await user.click(screen.getByRole("button", { name: /thursday/i }));
    expect(screen.getByTestId("days-dropdown")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /friday/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("days-dropdown")).not.toBeInTheDocument();
    });
  });

  it("applies opacity correctly for past hours on the current day", () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    const listItems = screen.getAllByRole("listitem");

    listItems.forEach((item, index) => {
      if (index < listItems.length - 2) {
        expect(item).toHaveClass("opacity-75");
      } else {
        expect(item).toHaveClass("opacity-100");
      }
    });
  });
});
