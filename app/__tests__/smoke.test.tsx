import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../page";

describe("smoke test", () => {
  it("renders a div and finds it in the document", () => {
    render(<div>Hi here is Brice!</div>);
    expect(screen.getByText("Hi here is Brice!")).toBeInTheDocument();
  });
});

describe("Home Page", () => {
  it("renders the hero heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /brice mehelo/i }),
    ).toBeInTheDocument();
  });
});
