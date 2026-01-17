import { useQuery } from "@tanstack/react-query";
import getLocationsUsecase from "../api/application/usecases/GetLocationsUsecase";

export function makeGetLocationsCacheKey(searchQuery: string) {
  return "get-locations-" + searchQuery;
}

function useGetLocations(searchQuery: string) {
  return useQuery({
    queryKey: [makeGetLocationsCacheKey(searchQuery)],
    queryFn: () => getLocationsUsecase.execute(searchQuery),
    retry: false,
    enabled: searchQuery.length >= 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 5, // 5 minutes
  });
}

export default useGetLocations;
