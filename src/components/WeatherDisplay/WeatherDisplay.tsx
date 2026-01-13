import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchLocationForm from "./SearchLocationForm";
import type { ILocation } from "../../api/domain/entities/ILocation";
import useGetWeather, {
  makeGetWeatherCacheKey,
} from "../../hooks/useGetWeather";
import CurrentWeatherSection from "./currentWeather/CurrentWeatherSection";
import useUnitsContext from "../../context/useUnitsContext";
import { useQueryClient } from "@tanstack/react-query";
import DailyWeatherSection from "./dailyWeather/DailyWeatherSection";
import HourlyWeatherSection from "./hourlyWeather/HourlyWeatherSection";
import localstorage from "../../utils/Localstorage";

function WeatherDisplay() {
  const queryClient = useQueryClient();
  const units = useUnitsContext().units;

  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(
    null
  );

  const weather = useGetWeather(currentLocation);

  const handleRetry = () => {
    queryClient.resetQueries({
      queryKey: [
        makeGetWeatherCacheKey(
          currentLocation?.latitude,
          currentLocation?.longitude
        ),
      ],
    });
  };

  useEffect(() => {
    const lastSearchedLocation = localstorage.get<ILocation>(
      "lastSearchedLocation"
    );
    if (!lastSearchedLocation) return;
    setCurrentLocation(lastSearchedLocation);
  }, []);

  useEffect(() => {
    if (currentLocation)
      localstorage.set("lastSearchedLocation", currentLocation);
  }, [currentLocation]);

  return (
    <div className="mb-4">
      {!weather.error && (
        <>
          <div className="mb-8 min-[747px]:mb-12">
            <Header title="How’s the sky looking today?" />
            <SearchLocationForm onLocationSelect={setCurrentLocation} />
          </div>

          {currentLocation && (
            <div className="flex flex-col gap-8">
              <div
                className="w-full grid grid-cols-[1fr_1fr_1fr] min-[1121px]:grid-cols-[1fr_1fr_384px] gap-x-8 gap-y-8 min-[1121px]:gap-y-12 justify-start auto-rows-auto"
                data-testid="weather-data-container"
              >
                <div className="col-span-3 col-start-1 min-[1121px]:col-span-2 min-[1121px]:row-span-1">
                  <CurrentWeatherSection
                    currentWeather={
                      weather.data ? weather.data.currentWeather : null
                    }
                    currentLocation={currentLocation}
                    units={units}
                    isLoading={weather.isLoading}
                  />
                </div>
                <div className="col-span-3 col-start-1 min-[1121px]:col-span-2 min-[1121px]:row-span-1">
                  <DailyWeatherSection
                    dailyWeather={
                      weather.data ? weather.data.dailyWeather : null
                    }
                    units={units}
                  />
                </div>
                <div className="col-span-3 min-[1121px]:col-start-3 min-[1121px]:col-span-1 min-[1121px]:row-start-1 min-[1121px]:row-span-2">
                  <HourlyWeatherSection
                    hourlyWeather={
                      weather.data ? weather.data.hourlyWeather : null
                    }
                    currentLocationTimezone={currentLocation.timezone}
                    todayDate={new Date()}
                    isLoading={weather.isLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {weather.error && (
        <div className="mt-26 text-center flex flex-col gap-6 items-center">
          <img src="/images/icon-error.svg" width={50} height={50} alt="" />
          <h1>Something went wrong</h1>
          <p className="text-xl text-text-muted font-medium w-full max-w-138.5 mx-auto">
            {weather.error.message}
          </p>
          <button
            className="py-3 px-4 rounded-input flex items-center gap-2.5 bg-ui cursor-pointer hover:bg-ui-hover transition-colors disabled:opacity-75"
            onClick={handleRetry}
            disabled={weather.isLoading}
          >
            <img src="/images/icon-retry.svg" width={16} height={16} alt="" />
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
