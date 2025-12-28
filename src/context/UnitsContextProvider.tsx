import { useEffect, useState } from "react";
import UnitsContext from "./Units.context";

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

function UnitsContextProvider({ children }: Props) {
  const [unitsType, setUnitsType] = useState<UnitsType>("metric");

  const [units, setUnits] = useState<Units>({
    temperatureUnit: "celsius",
    windSpeedUnit: "km/h",
    precipitationUnit: "mm",
  });

  const setTemperatureUnit = (unit: TemperatureUnit) => {
    setUnits((prev) => ({ ...prev, temperatureUnit: unit }));
  };

  const setWindSpeedUnit = (unit: WindSpeedUnit) => {
    setUnits((prev) => ({ ...prev, windSpeedUnit: unit }));
  };

  const setPrecipitationUnit = (unit: PrecipitationUnit) => {
    setUnits((prev) => ({ ...prev, precipitationUnit: unit }));
  };

  const setImperialUnits = () => {
    setUnits({
      temperatureUnit: "fahrenheit",
      windSpeedUnit: "mph",
      precipitationUnit: "in",
    });
  };

  const setMetricUnits = () => {
    setUnits({
      temperatureUnit: "celsius",
      windSpeedUnit: "km/h",
      precipitationUnit: "mm",
    });
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
