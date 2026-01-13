import type { ILocation } from "../../domain/entities/ILocation";
import type { LocationExternal } from "../dtos/LocationExternal";

class LocationMapper {
  externalToEntity = (locationExternal: LocationExternal): ILocation => {
    return {
      id: locationExternal.id,
      latitude: locationExternal.latitude,
      longitude: locationExternal.longitude,
      country: locationExternal.country,
      name: locationExternal.name,
      timezone: locationExternal.timezone,
    };
  };
}

const locationMapper = new LocationMapper();

export default locationMapper;
