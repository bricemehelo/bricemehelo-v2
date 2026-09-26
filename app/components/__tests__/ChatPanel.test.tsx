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
  }
    );
  });
});
