import type { IDailyWeather } from "../../../api/domain/entities/IDailyWeather";
import type { Units } from "../../../context/UnitsContextProvider";
import DailyWeatherCell from "./DailyWeatherCell";

interface Props {
  dailyWeather: IDailyWeather[] | null;
  units: Units;
}

function DailyWeatherSection({ dailyWeather, units }: Props) {
  return (
    <section className="flex flex-col gap-5 w-full">
      <h2 className="text-xl font-semibold font-dmSans leading-[120%]">Daily forecast</h2>
      <div className="grid min-[747px]:grid-cols-7 gap-4 w-full grid-cols-3 min-[480px]:grid-cols-4">
        {!dailyWeather &&
          [1, 2, 3, 4, 5, 6, 7].map((_, index) => {
            return (
              <div
                className="py-4 px-2.5 bg-ui border border-ui-border rounded-ui-container flex flex-col gap-4 items-center w-full h-41.25"
                data-testid="daily-weather-cell-placeholder"
                key={"daily-weather-cell-" + index}
              ></div>
            );
          })}
        {dailyWeather &&
          dailyWeather.map((weather) => {
            return <DailyWeatherCell key={weather.date} dailyWeather={weather} units={units} />;
          })}
      </div>
    </section>
  );
}

export default DailyWeatherSection;
