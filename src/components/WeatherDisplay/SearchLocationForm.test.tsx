import { vi } from "vitest";
import type { ILocation } from "../../api/domain/entities/ILocation";
import { render, screen } from "@testing-library/react";
import SearchLocationForm from "./SearchLocationForm";
import useGetLocations from "../../hooks/useGetLocations";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useGetLocations", () => ({
  default: vi.fn(),
}));

const mockLocations: ILocation[] = [
  { id: 1, name: "Bucharest", country: "Romania", latitude: 1, longitude: 2 },
  { id: 2, name: "Cluj-Napoca", country: "Romania", latitude: 1, longitude: 2 },
];

describe("SearchLocationForm.tsx", () => {
  it("should display a loading message while the search is loading", async () => {
    vi.mocked(useGetLocations).mockReturnValue({
      data: [],
      isLoading: true,
    } as any);

    render(<SearchLocationForm onLocationSelect={() => {}} />);

    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "bucharest");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const loadingMessage = screen.getByText(/search in progress/i);

    expect(loadingMessage).toBeInTheDocument();
  });

  it("should display search results after searching", async () => {
    vi.mocked(useGetLocations).mockImplementation(
      (query: string) =>
        ({
          data: query.length >= 2 ? mockLocations : undefined,
          isLoading: false,
          isError: false,
        } as any)
    );

    render(<SearchLocationForm onLocationSelect={() => {}} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    mockLocations.forEach((location) => {
      expect(
        screen.getByRole("button", {
          name: `${location.name}, ${location.country}`,
        })
      ).toBeInTheDocument();
    });
  });

  it("should select a search result", async () => {
    vi.mocked(useGetLocations).mockImplementation(
      (query: string) =>
        ({
          data: query.length >= 2 ? mockLocations : undefined,
          isLoading: false,
          isError: false,
        } as any)
    );

    const onLocationSelectMock = vi.fn();

    render(<SearchLocationForm onLocationSelect={onLocationSelectMock} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const searchResultButton = screen.getByRole("button", {
      name: `${mockLocations[0].name}, ${mockLocations[0].country}`,
    });

    await userEvent.click(searchResultButton);

    expect(onLocationSelectMock).toHaveBeenCalledWith(mockLocations[0]);
  });

  it("should display a no results message if there are no results to display", async () => {
    vi.mocked(useGetLocations).mockImplementation(
      (query: string) =>
        ({
          data: query.length >= 2 ? [] : undefined,
          isLoading: false,
          isError: false,
        } as any)
    );

    const onLocationSelectMock = vi.fn();

    render(<SearchLocationForm onLocationSelect={onLocationSelectMock} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const noResultsMessage = screen.getByText(/No search result found!/i);

    expect(noResultsMessage).toBeInTheDocument();
  });

  it("should call onLocationSelect with null if there are no results to show", async () => {
    vi.mocked(useGetLocations).mockImplementation(
      (query: string) =>
        ({
          data: query.length >= 2 ? [] : undefined,
          isLoading: false,
          isError: false,
        } as any)
    );

    const onLocationSelectMock = vi.fn();

    render(<SearchLocationForm onLocationSelect={onLocationSelectMock} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    expect(onLocationSelectMock).toHaveBeenCalledWith(null);
  });
});
