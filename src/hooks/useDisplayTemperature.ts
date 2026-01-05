import type { Units } from "../context/UnitsContextProvider";
import convertTemperatureToImperial from "../utils/weather/convertTemperatureToImperial";
import normalizeTemperature from "../utils/weather/normalizeTemperature";

function useDisplayTemperature(units: Units) {
  const display = (value: number) => {
    const currentTempUnit = units.temperatureUnit;

    switch (currentTempUnit) {
      case "celsius":
        return normalizeTemperature(value);
      case "fahrenheit":
        return normalizeTemperature(convertTemperatureToImperial(value));
    }
  };

  return display;
}

export default useDisplayTemperature;
