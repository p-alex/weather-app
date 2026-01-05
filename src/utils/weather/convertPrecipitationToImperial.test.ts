import convertPrecipitationToImperial from "./convertPrecipitationToImperial";

describe("convertPrecipitationToImperial.ts", () => {
  it("should return the correct value", () => {
    const result = convertPrecipitationToImperial(1);

    expect(result).toBe(1 / 25.4);
  });
});
