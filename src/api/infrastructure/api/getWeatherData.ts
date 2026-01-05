import ApiException from "../../exceptions/ApiException";
import type { GetWeatherDataResponse } from "../dtos/GetWeatherDataResponse";

export const GET_WEATHER_DATA_BASE_URL =
  "https://api.open-meteo.com/v1/forecast";

export type GetWeatherParams = {
  latitude: string;
  longitude: string;
  current: "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,relative_humidity_2m";
  daily: "weather_code,temperature_2m_max,temperature_2m_min";
  hourly: "temperature_2m,weather_code";
};

async function getWeatherData(latitude: number, longitude: number) {
  const url = new URL(GET_WEATHER_DATA_BASE_URL);

  const latitudeStr: GetWeatherParams["latitude"] = latitude.toString();

  const longitudeStr: GetWeatherParams["longitude"] = longitude.toString();

  const current: GetWeatherParams["current"] =
    "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,relative_humidity_2m";

  const daily: GetWeatherParams["daily"] =
    "weather_code,temperature_2m_max,temperature_2m_min";

  const hourly: GetWeatherParams["hourly"] = "temperature_2m,weather_code";

  url.searchParams.set("latitude" as keyof GetWeatherParams, latitudeStr);
  url.searchParams.set("longitude" as keyof GetWeatherParams, longitudeStr);
  url.searchParams.set("current" as keyof GetWeatherParams, current);
  url.searchParams.set("daily" as keyof GetWeatherParams, daily);
  url.searchParams.set("hourly" as keyof GetWeatherParams, hourly);

  const response = await fetch(url);

  if (!response.ok) throw new ApiException("Failed to fetch weather data.");

  return (await response.json()) as GetWeatherDataResponse;
}

export default getWeatherData;
