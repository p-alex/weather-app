import z from "zod";
import currentWeatherUnitsExternal from "./currentWeatherUnitsExternal.schema";
import currentWeatherExternal from "./currentWeatherExternal.schema";
import hourlyWeatherUnitsExternal from "./hourlyWeatherUnitsExternal.schema";
import hourlyWeatherExternal from "./hourlyWeatherExternal.schema";
import dailyWeatherUnitsExternal from "./dailyWeatherUnitsExternal.schema";
import dailyWeatherExternal from "./dailyWeatherExternal.schema";

const getWeatherDataResponse = z.object({
  current_units: currentWeatherUnitsExternal,
  current: currentWeatherExternal,
  hourly_units: hourlyWeatherUnitsExternal,
  hourly: hourlyWeatherExternal,
  daily_units: dailyWeatherUnitsExternal,
  daily: dailyWeatherExternal,
});

export default getWeatherDataResponse;
