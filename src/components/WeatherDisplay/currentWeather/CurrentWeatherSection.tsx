import type { ICurrentWeather } from "../../../api/domain/entities/ICurrentWeather";
import type { ILocation } from "../../../api/domain/entities/ILocation";
import type { Units } from "../../../context/UnitsContextProvider";
import useDisplayPrecipitation from "../../../hooks/useDisplayPrecipitation";
import useDisplayTemperature from "../../../hooks/useDisplayTemperature";
import useDisplayWindSpeed from "../../../hooks/useDisplayWindSpeed";
import CurrentWeatherBanner from "./CurrentWeatherBanner";
import CurrentWeatherCell from "./CurrentWeatherCell";

interface Props {
  currentWeather: ICurrentWeather | null;
  currentLocation: ILocation | null;
  units: Units;
  isLoading: boolean;
}

function CurrentWeatherSection({
  currentWeather,
  currentLocation,
  units,
  isLoading,
}: Props) {
  const displayTemperature = useDisplayTemperature(units);
  const displayPrecipitation = useDisplayPrecipitation(units);
  const displayWindSpeed = useDisplayWindSpeed(units);

  return (
    <section className="flex flex-col gap-5 min-[747px]:gap-8">
      <CurrentWeatherBanner
        currentLocation={currentLocation}
        currentWeather={currentWeather}
        units={units}
        isLoading={isLoading}
      />
      <div className="w-full gap-4 min-[747px]:gap-6 grid grid-cols-2 min-[747px]:grid-cols-4">
        <CurrentWeatherCell
          title="Feels Like"
          value={
            !isLoading && currentWeather !== null
              ? `${displayTemperature(currentWeather?.feelsLike)}°`
              : "-"
          }
        />
        <CurrentWeatherCell
          title="Humidity"
          value={
            !isLoading && currentWeather !== null
              ? `${currentWeather.humidity}%`
              : "-"
          }
        />
        <CurrentWeatherCell
          title="Wind"
          value={
            !isLoading && currentWeather !== null
              ? `${displayWindSpeed(currentWeather.windSpeed)} ${
                  units.windSpeedUnit
                }`
              : "-"
          }
        />
        <CurrentWeatherCell
          title="Precipitation"
          value={
            !isLoading && currentWeather !== null
              ? `${displayPrecipitation(currentWeather.precipitation)} ${
                  units.precipitationUnit
                }`
              : "-"
          }
        />
      </div>
    </section>
  );
}

export default CurrentWeatherSection;
