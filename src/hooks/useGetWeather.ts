import { useQuery } from "@tanstack/react-query";
import type { ILocation } from "../api/domain/entities/ILocation";
import getWeatherUsecase from "../api/application/usecases/GetWeatherUsecase";

function makeGetWeatherCacheKey(location: ILocation | null) {
  if (!location) {
    return "weather-data";
  } else {
    return "weather-data-" + location.latitude + "-" + location.longitude;
  }
}

function useGetWeather(location: ILocation | null) {
  return useQuery({
    queryKey: [makeGetWeatherCacheKey(location)],
    queryFn: () => {
      if (!location) return null;
      return getWeatherUsecase.execute(location.latitude, location.longitude);
    },
    retry: false,
    refetchOnWindowFocus: true,
    enabled: location !== null,
    staleTime: 1000 * 60 * 60 * 15, // 15 minutes
  });
}

export default useGetWeather;
