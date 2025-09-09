import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

vi.mock("@/utils", () => ({
  cn: vi.fn((...args) => args.filter(Boolean).join(" ")),
}));

describe("<Button />", () => {
  it("should render button with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });
  it("should render with custom children", () => {
    render(
      <Button>
        <span>Custom content</span>
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });

  it("should apply default variant classes", () => {
    render(<Button variant="default">Default Variant</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-white");
  });

  it("should apply secondary variant classes", () => {
    render(<Button variant="secondary">Secondary Variant</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-white");
  });

  it("should apply link variant classes", () => {
    render(<Button variant="link">Link Variant</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-white");
  });

  it("should apply both variant and size classes", () => {
    render(
      <Button variant="secondary" size="lg">
        Combined Props
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "text-white",
      "h-[44px]",
      "px-8",
      "text-md",
      "min-w-[18rem]",
    );
  });

  it("should handle link variant with small size", () => {
    render(
      <Button variant="link" size="sm">
        Link Small
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-sm", "min-w-[10rem]", "h-[44px]");
  });
});
