import { useCallback, useEffect, useState } from "react";
import type { GetWeatherUsecaseResult } from "../../../api/application/usecases/GetWeatherUsecase";
import {
  daysOfTheWeek,
  type DayOfTheWeekFullStrType,
} from "../../../utils/extractDayOfTheWeekFromDate";
import DropdownMenu from "../../DropdownMenu/DropdownMenu";
import DropdownMenuButton from "../../DropdownMenu/DropdownMenuButton";
import VisibilityProvider from "../../VisibilityProvider/VisibilityProvider";
import HourlyWeatherCell from "./HourlyWeatherCell";
import type { IHourlyWeather } from "../../../api/domain/entities/IHourlyWeather";
import datePartsExtractor from "../../../utils/DatePartsExtractor";

interface Props {
  hourlyWeather: GetWeatherUsecaseResult["hourlyWeather"];
  todayDate: Date;
  isLoading: boolean;
}

type HourlyWeatherGroupedByDate = { [key: string]: IHourlyWeather[] };

const scrollableContainerId = "hourly-scrollable-container";
const currentHourCellId = "current-hour-cell";

function HourlyWeatherSection({ hourlyWeather, todayDate, isLoading }: Props) {
  const currentDay = datePartsExtractor.getDayFullText(todayDate);

  const [groupedHourlyWeather, setGroupedHourlyWeather] =
    useState<HourlyWeatherGroupedByDate | null>(null);

  useEffect(() => {
    if (!hourlyWeather) return;
    setGroupedHourlyWeather(groupHourlyWeatherByDate(hourlyWeather));
  }, [hourlyWeather]);

  const [selectedDay, setSelectedDay] =
    useState<DayOfTheWeekFullStrType>(currentDay);

  const handleScrollCurrentHourCellIntoView = useCallback(() => {
    const currentHourCell = document.getElementById(
      currentHourCellId
    ) as HTMLLIElement | null;
    const prevWindowScrollY = window.scrollY;
    currentHourCell?.scrollIntoView({ block: "start" });
    window.scrollTo({ top: prevWindowScrollY });
  }, []);

  const handleScrollToTop = useCallback(() => {
    const scrollableContainer = document.getElementById(
      scrollableContainerId
    ) as HTMLDivElement;
    scrollableContainer?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (selectedDay !== currentDay) return handleScrollToTop();
    handleScrollCurrentHourCellIntoView();
  }, [
    selectedDay,
    groupedHourlyWeather,
    handleScrollCurrentHourCellIntoView,
    handleScrollToTop,
  ]);

  return (
    <section className="w-full h-full py-5 px-4 sm:py-6 sm:px-6 rounded-ui-container bg-ui flex flex-col justify-between gap-4">
      <div className="flex items-center w-full justify-between">
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
                {isLoading ? "-" : selectedDay}
                <img
                  src="/images/icon-dropdown.svg"
                  width={12}
                  height={18}
                  alt=""
                />
              </button>
            );
          }}
          content={({ toggleHeight, toggleVisibilityOff }) => {
            return (
              <div
                style={{ top: `calc(${toggleHeight}px + 10px)` }}
                className="absolute w-auto min-w-53.5 top-2.5 z-10 right-0"
              >
                <DropdownMenu
                  className="top-2.5 right-0 w-full p-2"
                  data-testid="days-dropdown"
                >
                  <div className="flex flex-col gap-1 w-full">
                    {handleReorderDaysOfTheWeek(currentDay).map((day) => {
                      return (
                        <DropdownMenuButton
                          key={day}
                          isSelected={day === selectedDay}
                          onClick={() => {
                            setSelectedDay(day);
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
        className="flex flex-col w-full gap-4 overflow-y-scroll h-[594.4px] scroll-smooth"
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
          groupedHourlyWeather !== null &&
          groupedHourlyWeather[selectedDay] &&
          groupedHourlyWeather[selectedDay].map((weatherData) => {
            const currentDate = new Date(weatherData.date);

            const todayHour = todayDate.getHours();
            const currentHour = currentDate.getHours();

            const isCurrentHour = todayHour === currentHour;
            const isEarlierThenCurrentHour =
              currentHour < todayHour && currentDate < todayDate;

            return (
              <li
                id={isCurrentHour ? currentHourCellId : undefined}
                key={weatherData.date}
                className={`${
                  isEarlierThenCurrentHour ? "opacity-75" : "opacity-100"
                }`}
              >
                <HourlyWeatherCell hourlyWeather={weatherData} />
              </li>
            );
          })}
      </ul>
    </section>
  );
}

function groupHourlyWeatherByDate(
  hourlyWeather: IHourlyWeather[]
): HourlyWeatherGroupedByDate {
  return hourlyWeather!.reduce((acc, curr) => {
    const currentHourlyWeather = curr;

    const dayOfTheWeek = datePartsExtractor.getDayFullText(
      currentHourlyWeather.date
    );

    if (!acc[dayOfTheWeek]) acc[dayOfTheWeek] = [];

    acc[dayOfTheWeek].push(currentHourlyWeather);

    return acc;
  }, {} as { [key: string]: IHourlyWeather[] });
}

function handleReorderDaysOfTheWeek(currentDay: DayOfTheWeekFullStrType) {
  const prevDays: DayOfTheWeekFullStrType[] = [];
  const result: DayOfTheWeekFullStrType[] = [];

  let currentDayReached = false;

  for (let i = 0; i < daysOfTheWeek.length; i++) {
    const day = daysOfTheWeek[i];

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
