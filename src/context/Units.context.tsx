import { createContext } from "react";
import type {
  PrecipitationUnit,
  TemperatureUnit,
  Units,
  UnitsType,
  WindSpeedUnit,
} from "./UnitsContextProvider";

export interface IUnitsContext {
  unitsType: UnitsType;
  units: Units;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setWindSpeedUnit: (unit: WindSpeedUnit) => void;
  setPrecipitationUnit: (unit: PrecipitationUnit) => void;
  setImperialUnits: () => void;
  setMetricUnits: () => void;
}

const UnitsContext = createContext<IUnitsContext>({} as IUnitsContext);

export default UnitsContext;
