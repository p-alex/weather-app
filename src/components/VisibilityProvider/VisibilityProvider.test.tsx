import { render, screen } from "@testing-library/react";
import VisibilityProvider from "./VisibilityProvider";
import userEvent from "@testing-library/user-event";

describe("VisibilityProvider.tsx", () => {
  it("should toggle visibility if the toggle button is clicked", async () => {
    render(
      <VisibilityProvider
        toggle={({ toggleVisibility }) => (
          <button onClick={toggleVisibility}>toggle</button>
        )}
        content={() => <p>content</p>}
      />
    );

    const toggle = screen.getByRole("button", { name: /toggle/i });

    await userEvent.click(toggle);

    expect(screen.queryByText("content")).toBeInTheDocument();

    await userEvent.click(toggle);

    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("should be able to toggle visibility off from content", async () => {
    render(
      <VisibilityProvider
        toggle={({ toggleVisibility }) => (
          <button onClick={toggleVisibility}>toggle</button>
        )}
        content={({ toggleVisibilityOff }) => (
          <button onClick={toggleVisibilityOff}>close</button>
        )}
      />
    );

    const toggle = screen.getByRole("button", { name: /toggle/i });

    await userEvent.click(toggle);

    const closeButton = screen.getByRole("button", { name: /close/i });

    await userEvent.click(closeButton);

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  it("should toggle visibility off and move focus to toggle if the 'Escape' key is pressed while the dropdown has focus", async () => {
    render(
      <VisibilityProvider
        toggle={({ toggleVisibility, toggleRef }) => (
          <button ref={toggleRef} onClick={toggleVisibility}>
            toggle
          </button>
        )}
        content={() => <button>content</button>}
      ></VisibilityProvider>
    );

    const toggle = screen.getByRole("button", { name: /toggle/i });

    await userEvent.click(toggle);

    await userEvent.tab();

    await userEvent.keyboard("[Escape]");

    expect(
      screen.queryByRole("button", { name: /content/i })
    ).not.toBeInTheDocument();

    expect(toggle).toHaveFocus();
  });

  it("should toggle visibility off if user clicks outside the VisibilityProvider", async () => {
    render(
      <>
        <button>outside</button>
        <VisibilityProvider
          toggle={({ toggleRef, toggleVisibility }) => (
            <button onClick={toggleVisibility} ref={toggleRef}>
              toggle
            </button>
          )}
          content={() => <p>content</p>}
        ></VisibilityProvider>
      </>
    );

    const toggle = screen.getByRole("button", { name: /toggle/i });

    await userEvent.click(toggle);

    const outsideButton = screen.getByRole("button", { name: /outside/i });

    await userEvent.click(outsideButton);

    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("should not move focus to toggle if clicking outside the VisibilityProvider while isVisible is set to false", async () => {
    render(
      <>
        <button>outside</button>
        <VisibilityProvider
          toggle={({ toggleRef, toggleVisibility }) => (
            <button onClick={toggleVisibility} ref={toggleRef}>
              toggle
            </button>
          )}
          content={() => <p>content</p>}
        ></VisibilityProvider>
      </>
    );

    const toggle = screen.getByRole("button", { name: /toggle/i });

    const outsideButton = screen.getByRole("button", { name: /outside/i });

    await userEvent.click(outsideButton);

    expect(toggle).not.toHaveFocus();
  });
});
