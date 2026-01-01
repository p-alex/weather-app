import type { GetWeatherDataResponse } from "../../api/infrastructure/dtos/GetWeatherDataResponse";
import { currentWeatherExternalFixture } from "./currentWeatherExternalFixture";
import { currentWeatherUnitsExternalFixture } from "./currentWeatherUnitsExternalFixture";
import { dailyWeatherExternalFixture } from "./dailyWeatherExternalFixture";
import { dailyWeatherUnitsExternalFixture } from "./dailyWeatherUnitsExternalFixture";
import { hourlyWeatherExternalFixture } from "./hourlyWeatherExternalFixture";
import { hourlyWeatherUnitsExternalFixture } from "./hourlyWeatherUnitsExternalFixture";

export const getWeatherDataExternalFixture: GetWeatherDataResponse = {
  current: currentWeatherExternalFixture,
  current_units: currentWeatherUnitsExternalFixture,
  daily: dailyWeatherExternalFixture,
  daily_units: dailyWeatherUnitsExternalFixture,
  hourly: hourlyWeatherExternalFixture,
  hourly_units: hourlyWeatherUnitsExternalFixture,
};
