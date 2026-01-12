import useUnitsContext from "../../context/useUnitsContext";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import DropdownMenuButton from "../DropdownMenu/DropdownMenuButton";
import DropdownMenuSection from "../DropdownMenu/DropdownMenuSection";
import VisibilityProvider from "../VisibilityProvider/VisibilityProvider";

function Nav() {
  const {
    unitsType,
    units,
    setTemperatureUnit,
    setWindSpeedUnit,
    setPrecipitationUnit,
    setImperialUnits,
    setMetricUnits,
  } = useUnitsContext();

  return (
    <nav className="relative flex items-center justify-between">
      <picture>
        <source
          srcSet="/images/logo.svg"
          width={197}
          height={40}
          media="(min-width: 640px)"
        />
        <img src="/images/logo.svg" width="137.9" height="28" alt="Logo" />
      </picture>
      <VisibilityProvider
        toggle={({ toggleRef, toggleVisibility }) => (
          <button
            ref={toggleRef}
            onClick={toggleVisibility}
            className="sm:py-3 sm:px-4 py-2 px-2.5 bg-ui rounded-input text-text font-medium cursor-pointer flex items-center gap-2.5 hover:bg-ui-hover transition-colors text-sm sm:text-[16px]"
          >
            <picture>
              <source
                srcSet="/images/icon-units.svg"
                width={16}
                height={16}
                media="(min-width: 640px)"
              />
              <img src="/images/icon-units.svg" width={14} height={14} alt="" />
            </picture>
            Units
            <picture>
              <source
                srcSet="/images/icon-dropdown.svg"
                width={12}
                height={18}
                media="(min-width: 640px)"
              />
              <img
                src="/images/icon-dropdown.svg"
                width={9}
                height={14}
                alt=""
              />
            </picture>
          </button>
        )}
        content={({ toggleHeight }) => (
          <div
            style={{ top: `calc(${toggleHeight}px + 10px)` }}
            className="min-w-53.5 absolute sm:top-12.5 right-0 z-(--z-dropdown)"
          >
            <DropdownMenu data-testid="units-dropdown">
              <DropdownMenuButton
                onClick={
                  unitsType === "metric" ? setImperialUnits : setMetricUnits
                }
                autoFocus
              >
                {unitsType === "metric"
                  ? "Switch to Imperial"
                  : "Switch to Metric"}
              </DropdownMenuButton>
              <DropdownMenuSection title="Temperature">
                <DropdownMenuButton
                  aria-selected={units.temperatureUnit === "celsius"}
                  isSelected={units.temperatureUnit === "celsius"}
                  onClick={() => setTemperatureUnit("celsius")}
                >
                  Celsius (°C)
                </DropdownMenuButton>
                <DropdownMenuButton
                  aria-selected={units.temperatureUnit === "fahrenheit"}
                  isSelected={units.temperatureUnit === "fahrenheit"}
                  onClick={() => setTemperatureUnit("fahrenheit")}
                >
                  Fahrenheit (°F)
                </DropdownMenuButton>
              </DropdownMenuSection>
              <DropdownMenuSection title="Wind Speed">
                <DropdownMenuButton
                  aria-selected={units.windSpeedUnit === "km/h"}
                  isSelected={units.windSpeedUnit === "km/h"}
                  onClick={() => setWindSpeedUnit("km/h")}
                >
                  km/h
                </DropdownMenuButton>
                <DropdownMenuButton
                  aria-selected={units.windSpeedUnit === "mph"}
                  isSelected={units.windSpeedUnit === "mph"}
                  onClick={() => setWindSpeedUnit("mph")}
                >
                  mph
                </DropdownMenuButton>
              </DropdownMenuSection>
              <DropdownMenuSection title="Precipitation">
                <DropdownMenuButton
                  aria-selected={units.precipitationUnit === "mm"}
                  isSelected={units.precipitationUnit === "mm"}
                  onClick={() => setPrecipitationUnit("mm")}
                >
                  Millimeters (mm)
                </DropdownMenuButton>
                <DropdownMenuButton
                  aria-selected={units.precipitationUnit === "in"}
                  isSelected={units.precipitationUnit === "in"}
                  onClick={() => setPrecipitationUnit("in")}
                >
                  Inches (in)
                </DropdownMenuButton>
              </DropdownMenuSection>
            </DropdownMenu>
          </div>
        )}
      />
    </nav>
  );
}

export default Nav;
