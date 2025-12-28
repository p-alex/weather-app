import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout.tsx", () => {
  it("should display children", () => {
    render(<Layout>children</Layout>);
    const children = screen.getByText("children");
    expect(children).toBeInTheDocument();
  });
});
