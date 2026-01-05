import convertTemperatureToImperial from "./convertTemperatureToImperial";

describe("convertTemperatureToImperial.ts", () => {
  it("should return the correct value", () => {
    const result = convertTemperatureToImperial(1);

    expect(result).toBe(1 * 1.8 + 32);
  });
});
