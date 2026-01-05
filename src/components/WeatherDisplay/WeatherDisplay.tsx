import { useState } from "react";
import Header from "../Header/Header";
import SearchLocationForm from "./SearchLocationForm";
import type { ILocation } from "../../api/domain/entities/ILocation";
import useGetWeather from "../../hooks/useGetWeather";
import CurrentWeatherSection from "./currentWeather/CurrentWeatherSection";
import useUnitsContext from "../../context/useUnitsContext";

function WeatherDisplay() {
  const { units } = useUnitsContext();

  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(
    null
  );

  const weather = useGetWeather(currentLocation);

  return (
    <div>
      <div className="mb-8 min-[747px]:mb-12">
        <Header title="How’s the sky looking today?" />
        <SearchLocationForm onLocationSelect={setCurrentLocation} />
      </div>

      {currentLocation && (
        <div
          className="w-full grid grid-cols-3 gap-8"
          data-testid="weather-data-container"
        >
          <div className="col-span-3 min-[1121px]:col-span-2">
            <CurrentWeatherSection
              currentWeather={
                weather.data?.currentWeather
                  ? weather.data.currentWeather
                  : null
              }
              currentLocation={currentLocation}
              units={units}
              isLoading={weather.isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
