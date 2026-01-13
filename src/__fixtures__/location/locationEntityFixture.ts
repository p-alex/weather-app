import type { ILocation } from "../../api/domain/entities/ILocation";
import { timezoneFixture } from "./timezoneFixture";

const locationFixture: ILocation = {
  id: 1850147,
  name: "Tokyo",
  latitude: 35.6895,
  longitude: 139.69171,
  country: "Japan",
  timezone: timezoneFixture,
};

export default locationFixture;
