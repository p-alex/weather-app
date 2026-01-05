import type { GetLocationsResponse } from "../../api/infrastructure/dtos/GetLocationsResponse";
import locationExternalFixture from "./locationExternalFixture";

export const getLocationDataExternalResponseFixture: GetLocationsResponse = {
  results: [locationExternalFixture],
};
