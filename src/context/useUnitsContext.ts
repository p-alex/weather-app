import { useContext } from "react";
import UnitsContext from "./Units.context";

function useUnitsContext() {
  return useContext(UnitsContext);
}

export default useUnitsContext;
