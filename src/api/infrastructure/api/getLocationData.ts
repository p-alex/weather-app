import ApiException from "../../exceptions/ApiException";
import type { GetLocationsResponse } from "../dtos/GetLocationsResponse";

async function getLocationData(
  searchQuery: string
): Promise<GetLocationsResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`;
  const response = await fetch(url);
  if (!response.ok) throw new ApiException("Failed to retrieve locations.");
  const json: GetLocationsResponse = await response.json();
  return json;
}

export default getLocationData;
