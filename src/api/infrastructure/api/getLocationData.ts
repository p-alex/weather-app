import ApiException from "../../exceptions/ApiException";
import type { GetLocationsResponse } from "../dtos/GetLocationsResponse";

export const GET_LOCATION_DATA_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

async function getLocationData(searchQuery: string): Promise<GetLocationsResponse> {
  const url = `${GET_LOCATION_DATA_BASE_URL}?name=${searchQuery}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new ApiException(
      "Failed to retrieve locations from the server (API error). Please try again later."
    );
  const json: GetLocationsResponse = await response.json();
  return json;
}

export default getLocationData;
