import locationFixture from "../../../__fixtures__/location/locationEntityFixture";
import locationExternalFixture from "../../../__fixtures__/location/locationExternalFixture";
import locationMapper from "./LocationMapper";

describe("LocationMapper.ts", () => {
  it("should return the correct result", () => {
    const result = locationMapper.externalToEntity(locationExternalFixture);

    expect(result).toEqual(locationFixture);
  });
});
