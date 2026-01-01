import { useState } from "react";
import Header from "../Header/Header";
import SearchLocationForm from "./SearchLocationForm";
import type { ILocation } from "../../api/domain/entities/ILocation";
import useGetWeather from "../../hooks/useGetWeather";

function WeatherDisplay() {
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(
    null
  );

  const weather = useGetWeather(currentLocation);

  return (
    <div>
      <Header title="How’s the sky looking today?" />
      <SearchLocationForm onLocationSelect={setCurrentLocation} />
      {currentLocation !== null && (
        <pre>{JSON.stringify(weather.data, null, 2)}</pre>
      )}
    </div>
  );
}

export default WeatherDisplay;
