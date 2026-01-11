import type { IHourlyWeather } from "../../../api/domain/entities/IHourlyWeather";
import useUnitsContext from "../../../context/useUnitsContext";
import useDisplayTemperature from "../../../hooks/useDisplayTemperature";
import datePartsExtractor from "../../../utils/DatePartsExtractor";
import weatherCodeToImageUrl from "../../../utils/weather/weatherCodeToImageUrl";

interface Props {
  hourlyWeather: IHourlyWeather | null;
}

function HourlyWeatherCell({ hourlyWeather }: Props) {
  const units = useUnitsContext().units;
  const displayTemperature = useDisplayTemperature(units);

  return (
    <div className="py-2.5 px-4 bg-ui-hover border border-ui-border flex items-center justify-between rounded-input h-15 w-full">
      {hourlyWeather && (
        <>
          <div className="flex items-center gap-2">
            <img
              src={weatherCodeToImageUrl(hourlyWeather.weatherCode)}
              width={40}
              height={40}
              alt=""
            />
            <p className="text-xl font-medium text-text">
              {`${datePartsExtractor.getHour(
                hourlyWeather.date,
                "12Hr"
              )} ${datePartsExtractor.getMeridiem(hourlyWeather.date)}`}
            </p>
          </div>
          <p className="font-medium text-text">
            {displayTemperature(hourlyWeather.temperature) + "°"}
          </p>
        </>
      )}
    </div>
  );
}

export default HourlyWeatherCell;
