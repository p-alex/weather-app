import type { ILocation } from "../api/domain/entities/ILocation";
import localstorage from "./Localstorage";

export const lastSearchedLocationLocalKey = "lastSearchedLocation";

function setDefaultLastSearchedLocation() {
  const lastSearchedLocation = localstorage.get<ILocation>(lastSearchedLocationLocalKey);
  if (lastSearchedLocation) return;
  localstorage.set(lastSearchedLocationLocalKey, {
    country: "Germany",
    id: 2950159,
    latitude: 52.52437,
    longitude: 13.41053,
    name: "Berlin",
    timezone: "Europe/Berlin",
  });
}

export default setDefaultLastSearchedLocation;
