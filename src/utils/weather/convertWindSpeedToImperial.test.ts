import convertWindSpeedToImperial from "./convertWindSpeedToImperial";

describe("convertWindSpeedToImperial.ts", () => {
  it("should return the correct value", () => {
    const result = convertWindSpeedToImperial(1);

    expect(result).toBe(1 / 1.609344);
  });
});
