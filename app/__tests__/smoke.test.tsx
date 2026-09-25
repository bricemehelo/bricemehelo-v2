import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../page";

describe("Home Page", () => {
  it("renders the hero heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /brice mehelo/i }),
    ).toBeInTheDocument();
  });
});
