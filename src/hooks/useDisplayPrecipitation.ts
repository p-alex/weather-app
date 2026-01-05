import type { Units } from "../context/UnitsContextProvider";
import convertPrecipitationToImperial from "../utils/weather/convertPrecipitationToImperial";
import normalizePrecipitation from "../utils/weather/normalizePrecipitation";

function useDisplayPrecipitation(units: Units) {
  const display = (value: number) => {
    const currentPrecipiationUnit = units.precipitationUnit;

    switch (currentPrecipiationUnit) {
      case "mm":
        return normalizePrecipitation(value);
      case "in":
        return normalizePrecipitation(convertPrecipitationToImperial(value));
    }
  };

  return display;
}

export default useDisplayPrecipitation;
