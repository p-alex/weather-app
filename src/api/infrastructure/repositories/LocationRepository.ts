import type { ILocation } from "../../domain/entities/ILocation";
import getLocationData from "../api/getLocationData";
import locationMapper from "../mappers/LocationMapper";
import locationExternal from "../schemas/locationExternal.schema";

export class LocationRepository {
  getAllByQuery = async (query: string): Promise<ILocation[]> => {
    const response = await getLocationData(query);

    const validLocations: ILocation[] = [];

    if (!response?.results) return validLocations;

    response.results.forEach((location) => {
      const isValid = locationExternal.safeParse(location).success;
      if (isValid)
        validLocations.push(locationMapper.externalToEntity(location));
    });

    return validLocations;
  };
}

const locationRepository = new LocationRepository();

export default locationRepository;
