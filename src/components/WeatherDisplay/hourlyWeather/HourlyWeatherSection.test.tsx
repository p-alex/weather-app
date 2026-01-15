import { render, screen, within } from "@testing-library/react";
import HourlyWeatherSection from "./HourlyWeatherSection";
import { hourlyWeatherFixture } from "../../../__fixtures__/weather/hourlyWeatherFixture";
import { daysFullStr } from "../../../utils/DatePartsExtractor";
import UnitsContextProvider from "../../../context/UnitsContextProvider";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import locationFixture from "../../../__fixtures__/location/locationEntityFixture";

const today = new Date(2026, 0, 15, 1); // Monday

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

vi.spyOn(Date, "now").mockReturnValue(1768484840753); // Thu Jan 15 2026 15:48:17 GMT+0200 (Eastern European Standard Time)

function wrapper({ children }: { children: React.ReactNode }) {
  return <UnitsContextProvider>{children}</UnitsContextProvider>;
}

function makeTestData() {
  const result: (typeof hourlyWeatherFixture)[] = [];

  daysFullStr.forEach((_, dayIndex) => {
    hours.forEach((hour) => {
      result.push({
        ...hourlyWeatherFixture,
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + dayIndex,
          hour
        ).toISOString(),
      });
    });
  });
  return result;
}

const testData = makeTestData();

describe("HourlyWeatherSection.tsx", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollTo = vi.fn();
    HTMLElement.prototype.scrollIntoView = vi.fn();
    Window.prototype.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("days dropdown toggle should display '-' if isLoading is set to true", () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={null}
        currentLocation={locationFixture}
        isLoading={true}
      />
    );

    const toggle = screen.getByRole("button", { name: /-/i });

    expect(toggle).toBeInTheDocument();
  });

  it("should display 24 cell skeletons if isLoading is set to true", () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={true}
      />
    );

    const items = screen.getAllByTestId("cell-loading-skeleton");

    expect(items).toHaveLength(24);
  });

  it("should scroll current hour cell into view if selected day is the current day", () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: "start",
    });
  });

  it("should scroll cell list to top if the selected day is not the current day", async () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    const toggle = screen.getByRole("button", { name: /thursday/i });

    await userEvent.click(toggle);

    const fridayButton = screen.getByRole("button", { name: /friday/i });

    await userEvent.click(fridayButton);

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it("should reorder days of the week based on current day inside days dropdown", async () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    const toggle = screen.getByRole("button", { name: /thursday/i });

    await userEvent.click(toggle);

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

  it("should automatically hide the dropdown after a day is selected", async () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    const toggle = screen.getByRole("button", { name: /thursday/i });

    await userEvent.click(toggle);

    expect(screen.getByTestId("days-dropdown")).toBeInTheDocument();

    const fridayButton = screen.getByRole("button", { name: /friday/i });

    await userEvent.click(fridayButton);

    expect(screen.queryByTestId("days-dropdown")).not.toBeInTheDocument();
  });

  it("should reduce opacity for hours that are in the past and on the same day", async () => {
    render(
      <HourlyWeatherSection
        hourlyWeather={testData}
        currentLocation={locationFixture}
        isLoading={false}
      />,
      { wrapper }
    );

    const todayListItems = screen.getAllByRole("listitem");

    todayListItems.forEach((listItem, index) => {
      if (index !== todayListItems.length - 1) {
        expect(listItem.classList.contains("opacity-75")).toBe(true);
      } else {
        expect(listItem.classList.contains("opacity-100")).toBe(true);
      }
    });

    const toggle = screen.getByRole("button", { name: /thursday/i });

    await userEvent.click(toggle);

    const fridayButton = screen.getByRole("button", { name: /friday/i });

    await userEvent.click(fridayButton);

    const fridayListItems = screen.getAllByRole("listitem");

    fridayListItems.forEach((listItem) => {
      expect(listItem.classList.contains("opacity-100")).toBe(true);
    });
  });
});
