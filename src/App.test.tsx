import { render } from "@testing-library/react";
import App from "./App";
import {
  defaultSearchLocation,
  lastSearchedLocationLocalKey,
} from "./utils/setDefaultLastSearchedLocation";
import locationFixture from "./__fixtures__/location/locationEntityFixture";

describe("App.tsx", () => {
  beforeAll(() => {
    window.localStorage.clear();
  });

  it("should set default location if not present in localstorage", () => {
    render(<App />);

    const result = JSON.parse(window.localStorage.getItem(lastSearchedLocationLocalKey)!);

    expect(result).not.toBeNull();
    expect(result).toEqual(defaultSearchLocation);
  });

  it("should not set default location if present in localstorage", () => {
    window.localStorage.setItem(lastSearchedLocationLocalKey, JSON.stringify(locationFixture));

    render(<App />);

    const result = JSON.parse(window.localStorage.getItem(lastSearchedLocationLocalKey)!);

    expect(result).not.toEqual(defaultSearchLocation);
  });
});
