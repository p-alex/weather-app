import locationRepository, {
  LocationRepository,
} from "../../infrastructure/repositories/LocationRepository";

export type GetLocationsUsecaseResult = Awaited<ReturnType<GetLocationsUsecase["execute"]>>;

export class GetLocationsUsecase {
  constructor(private readonly _locationRepository: LocationRepository) {}

  execute = async (query: string) => {
    return await this._locationRepository.getAllByQuery(query);
  };
}

const getLocationsUsecase = new GetLocationsUsecase(locationRepository);

export default getLocationsUsecase;
