import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "./Nav";
import UnitsContextProvider, {
  precipitationLocalKey,
  tempLocalKey,
  windLocalKey,
  type PrecipitationUnit,
  type TemperatureUnit,
  type WindSpeedUnit,
} from "../../context/UnitsContextProvider";

function wrapper({ children }: { children: React.ReactNode }) {
  return <UnitsContextProvider>{children}</UnitsContextProvider>;
}

async function toggleDropdownOn() {
  const unitsToggle = screen.getByRole("button", { name: /Units/i });
  await userEvent.click(unitsToggle);
  return unitsToggle;
}

async function getMetricButtons() {
  const tempMetricBtn = screen.getByRole("button", { name: /Celsius/i });
  const windMetricBtn = screen.getByRole("button", { name: /km\/h/i });
  const precipitationMetricBtn = screen.getByRole("button", {
    name: /Millimeters/i,
  });

  return { tempMetricBtn, windMetricBtn, precipitationMetricBtn };
}

async function getImperialButtons() {
  const tempImperialBtn = screen.getByRole("button", { name: /Fahrenheit/i });
  const windImperialBtn = screen.getByRole("button", { name: /mph/i });
  const precipitationImperialBtn = screen.getByRole("button", {
    name: /Inches/i,
  });

  return { tempImperialBtn, windImperialBtn, precipitationImperialBtn };
}

async function getUnitButtons() {
  return {
    ...(await getMetricButtons()),
    ...(await getImperialButtons()),
  };
}

describe("Nav.tsx", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterAll(() => {
    window.localStorage.clear();
  });

  it("should contain a units toggle button", () => {
    render(<Nav />, { wrapper });

    const unitsToggle = screen.getByRole("button", { name: /Units/i });

    expect(unitsToggle).toBeInTheDocument();
  });

  it("should toggle units dropdown by clicking on units toggle", async () => {
    render(<Nav />, { wrapper });

    const unitsToggle = await toggleDropdownOn();

    const unitsDropdown = screen.getByTestId("units-dropdown");

    expect(unitsDropdown).toBeInTheDocument();

    await userEvent.click(unitsToggle);

    expect(screen.queryByTestId("units-dropdown")).not.toBeInTheDocument();
  });

  it("should change to imperial units when clicking on 'Switch to Imperial' button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const switchToImperialButton = screen.getByRole("button", {
      name: /switch to imperial/i,
    });

    await userEvent.click(switchToImperialButton);

    const unitBtns = await getUnitButtons();

    expect(unitBtns.tempMetricBtn).toHaveAttribute("aria-selected", "false");
    expect(unitBtns.windMetricBtn).toHaveAttribute("aria-selected", "false");
    expect(unitBtns.precipitationMetricBtn).toHaveAttribute("aria-selected", "false");

    expect(unitBtns.tempImperialBtn).toHaveAttribute("aria-selected", "true");
    expect(unitBtns.windImperialBtn).toHaveAttribute("aria-selected", "true");
    expect(unitBtns.precipitationImperialBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change to metric units when clicking on 'Switch to Metric' button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const switchToImperialButton = screen.getByRole("button", {
      name: /switch to imperial/i,
    });

    await userEvent.click(switchToImperialButton);

    const switchToMetricButton = screen.getByRole("button", {
      name: /switch to metric/i,
    });

    await userEvent.click(switchToMetricButton);

    const unitBtns = await getUnitButtons();

    expect(unitBtns.tempMetricBtn).toHaveAttribute("aria-selected", "true");
    expect(unitBtns.windMetricBtn).toHaveAttribute("aria-selected", "true");
    expect(unitBtns.precipitationMetricBtn).toHaveAttribute("aria-selected", "true");

    expect(unitBtns.tempImperialBtn).toHaveAttribute("aria-selected", "false");
    expect(unitBtns.windImperialBtn).toHaveAttribute("aria-selected", "false");
    expect(unitBtns.precipitationImperialBtn).toHaveAttribute("aria-selected", "false");
  });

  it("should change to imperial temp unit when clicking on imperial temp button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const tempImperialBtn = screen.getByRole("button", { name: /Fahrenheit/i });

    await userEvent.click(tempImperialBtn);

    expect(tempImperialBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change to metric temp unit when clicking on metric temp button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const tempImperialBtn = screen.getByRole("button", { name: /Fahrenheit/i });

    await userEvent.click(tempImperialBtn);

    const tempMetricBtn = screen.getByRole("button", { name: /Celsius/i });

    await userEvent.click(tempMetricBtn);

    expect(tempMetricBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change to imperial wind unit when clicking on imperial wind button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const windImperialBtn = screen.getByRole("button", { name: /mph/i });

    await userEvent.click(windImperialBtn);

    expect(windImperialBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change to metric wind unit when clicking on metric wind button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const windImperialBtn = screen.getByRole("button", { name: /mph/i });

    await userEvent.click(windImperialBtn);

    const windMetricBtn = screen.getByRole("button", { name: /km\/h/i });

    await userEvent.click(windMetricBtn);

    expect(windMetricBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change to imperial precipitation unit when clicking on imperial precipitation button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const precipitationImperialBtn = screen.getByRole("button", {
      name: /Inches/i,
    });

    await userEvent.click(precipitationImperialBtn);

    expect(precipitationImperialBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change to metric precipitation unit when clicking on metric precipitation button", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const precipitationImperialBtn = screen.getByRole("button", {
      name: /Inches/i,
    });

    await userEvent.click(precipitationImperialBtn);

    const precipitationMetricBtn = screen.getByRole("button", {
      name: /Millimeters/i,
    });

    await userEvent.click(precipitationMetricBtn);

    expect(precipitationMetricBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should change 'switch to imperial' toggle to 'switch to metric' automatically based on whether all imperial units are selected", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const switchToImperial = screen.getByRole("button", {
      name: /switch to imperial/i,
    });

    expect(switchToImperial).toBeInTheDocument();

    const imperialButtons = await getImperialButtons();

    await userEvent.click(imperialButtons.tempImperialBtn);
    await userEvent.click(imperialButtons.windImperialBtn);
    await userEvent.click(imperialButtons.precipitationImperialBtn);

    const switchToMetric = screen.getByRole("button", {
      name: /switch to metric/i,
    });

    expect(switchToMetric).toBeInTheDocument();
  });

  it("should change 'switch to metric' toggle to 'switch to imperial' automatically based on whether all metric units are selected", async () => {
    render(<Nav />, { wrapper });

    await toggleDropdownOn();

    const switchToImperial = screen.getByRole("button", {
      name: /switch to imperial/i,
    });

    await userEvent.click(switchToImperial);

    const metricButtons = await getMetricButtons();

    await userEvent.click(metricButtons.tempMetricBtn);
    await userEvent.click(metricButtons.windMetricBtn);
    await userEvent.click(metricButtons.precipitationMetricBtn);

    expect(screen.queryByRole("button", { name: /switch to imperial/i })).toBeInTheDocument();
  });

  it("should set the units according to those stored in localstorage", async () => {
    const tempUnit: TemperatureUnit = "fahrenheit";
    const windUnit: WindSpeedUnit = "km/h";
    const precipitationUnit: PrecipitationUnit = "in";

    window.localStorage.setItem(tempLocalKey, JSON.stringify(tempUnit));
    window.localStorage.setItem(windLocalKey, JSON.stringify(windUnit));
    window.localStorage.setItem(precipitationLocalKey, JSON.stringify(precipitationUnit));

    render(<Nav />, { wrapper });

    const toggle = screen.getByRole("button", { name: /units/i });

    await userEvent.click(toggle);

    const tempUnitBtn = screen.getByRole("button", {
      name: new RegExp(tempUnit, "i"),
    });
    const windUnitBtn = screen.getByRole("button", {
      name: new RegExp(windUnit, "i"),
    });
    const precipitationUnitBtn = screen.getByRole("button", {
      name: new RegExp(precipitationUnit, "i"),
    });

    expect(tempUnitBtn).toHaveAttribute("aria-selected", "true");
    expect(windUnitBtn).toHaveAttribute("aria-selected", "true");
    expect(precipitationUnitBtn).toHaveAttribute("aria-selected", "true");
  });

  it("should set the units to metric by default", async () => {
    const tempUnit: TemperatureUnit = "celsius";
    const windUnit: WindSpeedUnit = "km/h";
    const precipitationUnit: PrecipitationUnit = "mm";

    render(<Nav />, { wrapper });

    const toggle = screen.getByRole("button", { name: /units/i });

    await userEvent.click(toggle);

    const tempUnitBtn = screen.getByRole("button", {
      name: new RegExp(tempUnit, "i"),
    });
    const windUnitBtn = screen.getByRole("button", {
      name: new RegExp(windUnit, "i"),
    });
    const precipitationUnitBtn = screen.getByRole("button", {
      name: new RegExp(precipitationUnit, "i"),
    });

    expect(tempUnitBtn).toHaveAttribute("aria-selected", "true");
    expect(windUnitBtn).toHaveAttribute("aria-selected", "true");
    expect(precipitationUnitBtn).toHaveAttribute("aria-selected", "true");
  });
});
