import { useEffect, useState } from "react";
import UnitsContext from "./Units.context";
import localstorage from "../utils/Localstorage";

interface Props {
  children: React.ReactNode;
}

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "km/h" | "mph";
export type PrecipitationUnit = "mm" | "in";

export type UnitsType = "metric" | "imperial";

export interface Units {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  precipitationUnit: PrecipitationUnit;
}

export const tempLocalKey = "tempUnit";
export const windLocalKey = "windUnit";
export const precipitationLocalKey = "precipitationKey";

function UnitsContextProvider({ children }: Props) {
  const [unitsType, setUnitsType] = useState<UnitsType>("metric");

  const [units, setUnits] = useState<Units>({
    temperatureUnit: "celsius",
    windSpeedUnit: "km/h",
    precipitationUnit: "mm",
  });

  const setTemperatureUnit = (unit: TemperatureUnit) => {
    setUnits((prev) => ({ ...prev, temperatureUnit: unit }));
    localstorage.set(tempLocalKey, unit);
  };

  const setWindSpeedUnit = (unit: WindSpeedUnit) => {
    setUnits((prev) => ({ ...prev, windSpeedUnit: unit }));
    localstorage.set(windLocalKey, unit);
  };

  const setPrecipitationUnit = (unit: PrecipitationUnit) => {
    setUnits((prev) => ({ ...prev, precipitationUnit: unit }));
    localstorage.set(precipitationLocalKey, unit);
  };

  const setImperialUnits = () => {
    setUnits({
      temperatureUnit: "fahrenheit",
      windSpeedUnit: "mph",
      precipitationUnit: "in",
    });
    localstorage.set(tempLocalKey, "fahrenheit");
    localstorage.set(windLocalKey, "mph");
    localstorage.set(precipitationLocalKey, "in");
  };

  const setMetricUnits = () => {
    setUnits({
      temperatureUnit: "celsius",
      windSpeedUnit: "km/h",
      precipitationUnit: "mm",
    });
    localstorage.set(tempLocalKey, "celsius");
    localstorage.set(windLocalKey, "km/h");
    localstorage.set(precipitationLocalKey, "mm");
  };

  useEffect(() => {
    if (
      units.temperatureUnit === "celsius" &&
      units.windSpeedUnit === "km/h" &&
      units.precipitationUnit === "mm"
    ) {
      setUnitsType("metric");
    }

    if (
      units.temperatureUnit === "fahrenheit" &&
      units.windSpeedUnit === "mph" &&
      units.precipitationUnit === "in"
    ) {
      setUnitsType("imperial");
    }
  }, [units]);

  useEffect(() => {
    let tempUnit = localstorage.get<TemperatureUnit>(tempLocalKey);
    if (!tempUnit) {
      localstorage.set(tempLocalKey, "celsius");
      tempUnit = "celsius";
    }

    let windUnit = localstorage.get<WindSpeedUnit>(windLocalKey);
    if (!windUnit) {
      localstorage.set(windLocalKey, "km/h");
      windUnit = "km/h";
    }

    let precipitationUnit = localstorage.get<PrecipitationUnit>(
      precipitationLocalKey
    );
    if (!precipitationUnit) {
      localstorage.set(precipitationLocalKey, "mm");
      precipitationUnit = "mm";
    }

    setUnits({
      temperatureUnit: tempUnit,
      windSpeedUnit: windUnit,
      precipitationUnit: precipitationUnit,
    });
  }, []);

  return (
    <UnitsContext.Provider
      value={{
        unitsType,
        units,
        setTemperatureUnit,
        setWindSpeedUnit,
        setPrecipitationUnit,
        setImperialUnits,
        setMetricUnits,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}

export default UnitsContextProvider;
