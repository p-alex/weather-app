import type { ICurrentWeather } from "../../../api/domain/entities/ICurrentWeather";
import type { ILocation } from "../../../api/domain/entities/ILocation";
import type { Units } from "../../../context/UnitsContextProvider";
import useDisplayTemperature from "../../../hooks/useDisplayTemperature";
import weatherCodeToImageUrl from "../../../utils/weather/weatherCodeToImageUrl";

interface Props {
  currentLocation: ILocation | null;
  currentWeather: ICurrentWeather | null;
  units: Units;
  isLoading: boolean;
}

function CurrentWeatherBanner({
  currentLocation,
  currentWeather,
  units,
  isLoading,
}: Props) {
  const displayTemperature = useDisplayTemperature(units);

  const bannerBg = isLoading
    ? "bg-none bg-ui min-[747px]:bg-none"
    : "bg-[url(/images/bg-today-small.svg)] min-[747px]:bg-[url(/images/bg-today-large.svg)] bg-no-repeat bg-cover bg-center";

  const canShowData =
    !isLoading && currentLocation !== null && currentWeather !== null;

  return (
    <div
      className={`${bannerBg} w-full h-71.5 rounded-2xl overflow-hidden py-10.25 min-[747px]:py-20 px-6 gap-4 flex items-center min-[747px]:justify-between max-[747px]:flex-col max-[747px]:text-center`}
      data-testid="weather-banner"
    >
      {canShowData && (
        <>
          <div className="flex flex-col gap-3 justify-start sm:justify-center h-full">
            <h2 className="capitalize font-bold font-dmSans text-[28px] leading-[120%]">
              {currentLocation.name}, {currentLocation.country}
            </h2>
            <p className="font-medium text-text text-lg opacity-80 leading-[100%]">
              {processDate(new Date().toISOString())}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {currentWeather !== null && (
              <img
                src={weatherCodeToImageUrl(currentWeather.weatherCode)}
                width={120}
                height={120}
                alt=""
              />
            )}
            <p className="text-[6rem] italic tracking-[-2%] leading-[100%]">
              {`${displayTemperature(currentWeather?.temperature)}°`}
            </p>
          </div>
        </>
      )}
      {isLoading && (
        <div className="flex flex-col gap-3.5 w-full h-full justify-center items-center">
          <img
            src="/images/icon-loading.svg"
            width={24}
            height={24}
            className="animate-spin"
            alt=""
          />
          <p className="text-lg font-medium text-neutral-200">Loading...</p>
        </div>
      )}
    </div>
  );
}

function processDate(date: string) {
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const dateObj = new Date(date);

  const day = dateObj.getDate() as keyof typeof days;
  const month = (dateObj.getMonth() + 1) as keyof typeof months;
  const year = dateObj.getFullYear();

  return `${days[day]}, ${months[month]} ${day}, ${year}`;
}

export default CurrentWeatherBanner;
