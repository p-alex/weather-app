import type { IDailyWeather } from "../../../api/domain/entities/IDailyWeather";
import type { Units } from "../../../context/UnitsContextProvider";
import useDisplayTemperature from "../../../hooks/useDisplayTemperature";
import weatherCodeToImageUrl from "../../../utils/weather/weatherCodeToImageUrl";

interface Props {
  dailyWeather: IDailyWeather;
  units: Units;
}

function DailyWeatherCell({ dailyWeather, units }: Props) {
  const displayTemperature = useDisplayTemperature(units);

  return (
    <div
      className="py-4 px-2.5 bg-ui border border-ui-border rounded-ui-container flex flex-col gap-4 items-center w-full h-41.25"
      data-testid={"daily-weather-cell"}
    >
      <p className="text-lg font-medium text-text">
        {processDate(dailyWeather.date)}
      </p>
      <img
        src={weatherCodeToImageUrl(dailyWeather.weatherCode)}
        width={60}
        height={60}
        alt=""
      />
      <div className="w-full flex justify-between">
        <p className="font-medium text-text">
          {displayTemperature(dailyWeather.maxTemperature)}°
        </p>
        <p className="font-medium text-neutral-200">
          {displayTemperature(dailyWeather.minTemperature)}°
        </p>
      </div>
    </div>
  );
}

function processDate(date: string) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date(date);

  return weekDays[currentDate.getDay()];
}

export default DailyWeatherCell;
