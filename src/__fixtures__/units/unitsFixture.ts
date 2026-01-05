import type { Units } from "../../context/UnitsContextProvider";

export const metricUnitsFixture: Units = {
  precipitationUnit: "mm",
  temperatureUnit: "celsius",
  windSpeedUnit: "km/h",
};

export const imperialUnitsFixture: Units = {
  precipitationUnit: "in",
  temperatureUnit: "fahrenheit",
  windSpeedUnit: "mph",
};
