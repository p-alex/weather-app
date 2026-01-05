import { useQuery } from "@tanstack/react-query";
import type { ILocation } from "../api/domain/entities/ILocation";
import getWeatherUsecase from "../api/application/usecases/GetWeatherUsecase";

export function makeGetWeatherCacheKey(latitude?: number, longitude?: number) {
  if (!latitude || !longitude) {
    return "weather-data";
  } else {
    return "weather-data-" + latitude + "-" + longitude;
  }
}

function useGetWeather(location: ILocation | null) {
  return useQuery({
    queryKey: [makeGetWeatherCacheKey(location?.latitude, location?.longitude)],
    queryFn: () => {
      return getWeatherUsecase.execute(location!.latitude, location!.longitude);
    },
    retry: false,
    refetchOnWindowFocus: true,
    enabled: location !== null,
    staleTime: 1000 * 60 * 60 * 15, // 15 minutes
  });
}

export default useGetWeather;
