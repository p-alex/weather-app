import { render, screen } from "@testing-library/react";
import DropdownMenuButton from "./DropdownMenuButton";

describe("DropdownMenuButton.tsx", () => {
  it("should display checkmark icon if button is selected", () => {
    render(<DropdownMenuButton isSelected>test</DropdownMenuButton>);

    const checkmark = screen.getByRole("img");

    expect(checkmark).toBeInTheDocument();
  });

  it("should not display checkmark icon if button is not selected", () => {
    render(<DropdownMenuButton>test</DropdownMenuButton>);

    const checkmark = screen.queryByRole("img");

    expect(checkmark).not.toBeInTheDocument();
  });
});
