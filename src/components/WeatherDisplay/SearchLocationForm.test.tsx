import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchLocationForm from "./SearchLocationForm";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { GET_LOCATION_DATA_BASE_URL } from "../../api/infrastructure/api/getLocationData";
import { getLocationDataExternalResponseFixture } from "../../__fixtures__/location/getLocationDataExternalResponseFixture";
import { getLocationUsecaseResponseFixture } from "../../__fixtures__/usecases/location/getLocationUsecaseResponseFixture";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const server = setupServer(
  http.get(GET_LOCATION_DATA_BASE_URL, () => {
    return HttpResponse.json(getLocationDataExternalResponseFixture);
  })
);

function createWrapper() {
  const queryClient = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("SearchLocationForm.tsx", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display a loading message while the search is loading", async () => {
    server.use(
      http.get(GET_LOCATION_DATA_BASE_URL, async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
        return HttpResponse.json(getLocationDataExternalResponseFixture);
      })
    );

    render(<SearchLocationForm onLocationSelect={() => {}} />, {
      wrapper: createWrapper(),
    });

    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "bucharest");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const loadingMessage = await screen.findByText(/search in progress/i);

    expect(loadingMessage).toBeInTheDocument();
  });

  it("should display search results after searching", async () => {
    render(<SearchLocationForm onLocationSelect={() => {}} />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    getLocationUsecaseResponseFixture.forEach((location) => {
      expect(
        screen.getByRole("button", {
          name: `${location.name}, ${location.country}`,
        })
      ).toBeInTheDocument();
    });
  });

  it("should select a search result", async () => {
    const onLocationSelectMock = vi.fn();

    render(<SearchLocationForm onLocationSelect={onLocationSelectMock} />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const searchResultButton = screen.getByRole("button", {
      name: `${getLocationUsecaseResponseFixture[0].name}, ${getLocationUsecaseResponseFixture[0].country}`,
    });

    await userEvent.click(searchResultButton);

    expect(onLocationSelectMock).toHaveBeenCalledWith(
      getLocationUsecaseResponseFixture[0]
    );
  });

  it("should display a no results message if there are no results to display", async () => {
    server.use(
      http.get(GET_LOCATION_DATA_BASE_URL, () => HttpResponse.json([]))
    );

    const onLocationSelectMock = vi.fn();

    render(<SearchLocationForm onLocationSelect={onLocationSelectMock} />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const noResultsMessage = screen.getByText(/No search result found!/i);

    expect(noResultsMessage).toBeInTheDocument();
  });

  it("should call onLocationSelect with null if there are no results to show", async () => {
    server.use(
      http.get(GET_LOCATION_DATA_BASE_URL, () => HttpResponse.json([]))
    );

    const onLocationSelectMock = vi.fn();

    render(<SearchLocationForm onLocationSelect={onLocationSelectMock} />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    expect(onLocationSelectMock).toHaveBeenCalledWith(null);
  });

  it("typing a new search query should cause the previous search results to disappear", async () => {
    render(<SearchLocationForm onLocationSelect={() => {}} />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    expect(
      screen.getByRole("button", {
        name: `${getLocationUsecaseResponseFixture[0].name}, ${getLocationUsecaseResponseFixture[0].country}`,
      })
    ).toBeInTheDocument();

    await userEvent.type(input, "to");

    expect(
      screen.queryByRole("button", {
        name: `${getLocationUsecaseResponseFixture[0].name}, ${getLocationUsecaseResponseFixture[0].country}`,
      })
    ).not.toBeInTheDocument();
  });

  it("should display error message if location search request fails", async () => {
    server.use(
      http.get(
        GET_LOCATION_DATA_BASE_URL,
        () => new HttpResponse(null, { status: 500 })
      )
    );

    render(<SearchLocationForm onLocationSelect={() => {}} />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "bu");

    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(searchButton);

    const message = screen.getByText(/failed/i);

    expect(message).toBeInTheDocument();
  });
});
