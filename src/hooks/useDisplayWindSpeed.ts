import type { Units } from "../context/UnitsContextProvider";
import convertWindSpeedToImperial from "../utils/weather/convertWindSpeedToImperial";
import normalizeWindSpeed from "../utils/weather/normalizeWindSpeed";

function useDisplayWindSpeed(units: Units) {
  const display = (value: number) => {
    const currentWindSpeedUnit = units.windSpeedUnit;

    switch (currentWindSpeedUnit) {
      case "km/h":
        return normalizeWindSpeed(value);
      case "mph":
        return normalizeWindSpeed(convertWindSpeedToImperial(value));
    }
  };

  return display;
}

export default useDisplayWindSpeed;
