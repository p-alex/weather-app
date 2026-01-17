import type { GetWeatherUsecaseResult } from "../../../api/application/usecases/GetWeatherUsecase";
import DropdownMenu from "../../DropdownMenu/DropdownMenu";
import VisibilityProvider from "../../VisibilityProvider/VisibilityProvider";
import type { IHourlyWeather } from "../../../api/domain/entities/IHourlyWeather";
import datePartsExtractor, {
  daysFullStr,
  type DaysFullStr,
} from "../../../utils/DatePartsExtractor";
import type { ILocation } from "../../../api/domain/entities/ILocation";
import { useCallback, useEffect, useState } from "react";
import convertTimezone from "../../../utils/convertTimezone";
import { currentTimezone } from "../../../utils/currentTimezone";
import DropdownMenuButton from "../../DropdownMenu/DropdownMenuButton";
import HourlyWeatherCell from "./HourlyWeatherCell";

interface Props {
  hourlyWeather: GetWeatherUsecaseResult["hourlyWeather"] | null;
  currentLocation: ILocation;
  isLoading: boolean;
}

type HourlyWeatherGroupedByDate = { [key: string]: IHourlyWeather[] };

const scrollableContainerId = "hourly-scrollable-container";
const currentHourCellId = "current-hour-cell";

interface IState {
  locationDate: Date | null;
  selectedDay: DaysFullStr[number] | null;
  groupedHourlyWeather: { [key: string]: IHourlyWeather[] } | null;
  isReady: boolean;
}

function HourlyWeatherSection({ isLoading, hourlyWeather, currentLocation }: Props) {
  const [state, setState] = useState<IState>({
    locationDate: null,
    selectedDay: null,
    groupedHourlyWeather: null,
    isReady: false,
  });

  useEffect(() => {
    if (!hourlyWeather) return;

    const todayDate = new Date(Date.now());

    const locationDate = convertTimezone({
      date: todayDate,
      fromTimezone: currentTimezone,
      toTimezone: currentLocation.timezone,
    });

    setState((prev) => ({
      ...prev,
      locationDate,
      selectedDay: datePartsExtractor.getDayFullText(locationDate),
      groupedHourlyWeather: groupHourlyWeatherByDate(hourlyWeather),
    }));
  }, [hourlyWeather, currentLocation]);

  useEffect(() => {
    const isReady =
      state.locationDate !== null &&
      state.selectedDay !== null &&
      state.groupedHourlyWeather !== null;

    setState((prev) => ({ ...prev, isReady }));
  }, [state.locationDate, state.selectedDay, state.groupedHourlyWeather]);

  const handleScrollCurrentHourCellIntoView = useCallback(() => {
    const currentHourCell = document.getElementById(currentHourCellId) as HTMLLIElement | null;

    const prevWindowScrollY = window.scrollY;

    currentHourCell?.scrollIntoView({ block: "start" });

    window.scrollTo({ top: prevWindowScrollY });
  }, []);

  const handleScrollToTop = useCallback(() => {
    const scrollableContainer = document.getElementById(scrollableContainerId) as HTMLDivElement;

    scrollableContainer?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!state.isReady) return;

    if (state.selectedDay !== datePartsExtractor.getDayFullText(state.locationDate!))
      return handleScrollToTop();

    handleScrollCurrentHourCellIntoView();
  }, [state, handleScrollCurrentHourCellIntoView, handleScrollToTop]);

  return (
    <section className="w-full h-full py-5 sm:py-6 rounded-ui-container bg-ui flex flex-col justify-between gap-4">
      <div className="flex items-center w-full justify-between px-4 sm:px-6">
        <h2 className="font-semibold text-xl leading-[120%] text-text font-dmSans">
          Hourly forecast
        </h2>

        <VisibilityProvider
          toggle={({ toggleRef, toggleVisibility }) => {
            return (
              <button
                className="py-2 px-4 flex items-center gap-3 font-medium bg-ui-hover rounded-input cursor-pointer"
                ref={toggleRef}
                onClick={toggleVisibility}
              >
                {isLoading ? "-" : state.selectedDay}
                <img src="/images/icon-dropdown.svg" width={12} height={18} alt="" />
              </button>
            );
          }}
          content={({ toggleHeight, toggleVisibilityOff }) => {
            return (
              <div
                style={{ top: `calc(${toggleHeight}px + 10px)` }}
                className="absolute w-auto min-w-53.5 z-10 right-0"
              >
                <DropdownMenu className="top-2.5 right-0 w-full p-2" data-testid="days-dropdown">
                  <div className="flex flex-col gap-1 w-full">
                    {state.isReady &&
                      handleReorderDaysOfTheWeek(
                        datePartsExtractor.getDayFullText(state.locationDate!)
                      ).map((day) => {
                        return (
                          <DropdownMenuButton
                            key={day}
                            isSelected={day === state.selectedDay}
                            onClick={() => {
                              setState((prev) => ({
                                ...prev,
                                selectedDay: day,
                              }));
                              toggleVisibilityOff();
                            }}
                          >
                            {day}
                          </DropdownMenuButton>
                        );
                      })}
                  </div>
                </DropdownMenu>
              </div>
            );
          }}
        />
      </div>

      <ul
        className="flex flex-col w-full gap-4 overflow-y-scroll h-[594.4px] scroll-smooth px-4 sm:px-6"
        id={scrollableContainerId}
      >
        {isLoading &&
          Array.from({ length: 24 }).map((_, index) => {
            return (
              <li
                className="bg-ui-hover border border-ui-border rounded-input min-h-15 w-full"
                data-testid="cell-loading-skeleton"
                key={"hourly-cell-skeleton-" + index}
              ></li>
            );
          })}

        {!isLoading &&
          state.groupedHourlyWeather &&
          state.selectedDay &&
          state.locationDate &&
          (state.groupedHourlyWeather[state.selectedDay] ?? []).map((weatherData) => {
            const todayLocationHour = state.locationDate!.getHours();

            const weatherDataHour = datePartsExtractor.getHour(weatherData.date, "24Hr");

            const isCurrentHour = todayLocationHour === weatherDataHour;

            const isEarlierThenCurrentHour =
              weatherDataHour < todayLocationHour &&
              new Date(weatherData.date) < state.locationDate!;

            return (
              <li
                id={isCurrentHour ? currentHourCellId : undefined}
                key={weatherData.date}
                className={`${isEarlierThenCurrentHour ? "opacity-75" : "opacity-100"}`}
              >
                <HourlyWeatherCell hourlyWeather={weatherData} />
              </li>
            );
          })}
      </ul>
    </section>
  );
}

function groupHourlyWeatherByDate(hourlyWeather: IHourlyWeather[]): HourlyWeatherGroupedByDate {
  return hourlyWeather.reduce(
    (acc, curr) => {
      const currentHourlyWeather = curr;

      const dayOfTheWeek = datePartsExtractor.getDayFullText(currentHourlyWeather.date);

      if (!acc[dayOfTheWeek]) acc[dayOfTheWeek] = [];

      acc[dayOfTheWeek].push(currentHourlyWeather);

      return acc;
    },
    {} as { [key: string]: IHourlyWeather[] }
  );
}

function handleReorderDaysOfTheWeek(currentDay: DaysFullStr[number]) {
  const prevDays: DaysFullStr[number][] = [];
  const result: DaysFullStr[number][] = [];

  let currentDayReached = false;

  for (let i = 0; i < daysFullStr.length; i++) {
    const day = daysFullStr[i];

    if (day === currentDay) currentDayReached = true;

    if (!currentDayReached) {
      prevDays.push(day);
      continue;
    }

    result.push(day);
  }

  for (let i = 0; i < prevDays.length; i++) result.push(prevDays[i]);

  return result;
}

export default HourlyWeatherSection;
