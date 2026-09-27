import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ChatPanel from "../ChatPanel";

describe("ChatPanel", () => {
  it("renders the initial assistant message", () => {
    render(<ChatPanel />);
    expect(
      screen.getByText(/ask me anything about his work/i),
    ).toBeInTheDocument();
  });

  it("adds a user message to the list on submit", async () => {
    const user = userEvent.setup();
    render(<ChatPanel />);

    const input = screen.getByLabelText(/ask a question/i);
    await user.type(input, "What projects has Brice shipped?");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(
      screen.getByText("What projects has Brice shipped?"),
    ).toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});
