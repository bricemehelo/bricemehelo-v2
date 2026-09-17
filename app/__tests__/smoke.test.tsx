import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("smoke test", () => {
  it("renders a div and finds it in the document", () => {
    render(<div>Hi here is Brice Mehelo !</div>);
    expect(screen.getByText("Hi here is Brice Mehelo !")).toBeInTheDocument();
  });
});
