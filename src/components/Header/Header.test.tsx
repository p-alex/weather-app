import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header.tsx", () => {
  it("should display the title", () => {
    render(<Header title="title" />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
