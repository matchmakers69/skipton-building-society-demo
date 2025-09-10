import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostHeroImage from "./PostHeroImage";

vi.mock("next/image", () => ({
  __esModule: true,
  default: vi.fn(({ src, alt, fill, style, sizes, priority, ...props }) => (
    <img
      src={src}
      alt={alt}
      {...props}
      data-testid="next-image"
      data-fill={fill}
      data-style={JSON.stringify(style)}
      data-sizes={sizes}
      data-priority={priority}
    />
  )),
}));

const DUMMY_IMAGE = "https://picsum.photos/1200/600";

describe("PostHeroImage", () => {
  it("should render with default props", () => {
    render(<PostHeroImage />);

    const container = screen.getByRole("img").parentElement;
    const image = screen.getByRole("img");
    const overlay = container?.querySelector(".absolute.inset-0.bg-black\\/25");

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
  });

  it("should use dummy image when no src is provided", () => {
    render(<PostHeroImage />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", DUMMY_IMAGE);
  });

  it("should use provided src when given", () => {
    const customSrc = "https://example.com/custom-image.jpg";
    render(<PostHeroImage src={customSrc} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", customSrc);
  });

  it("should use default alt text when none provided", () => {
    render(<PostHeroImage />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Post hero image");
  });

  it("should use provided alt text when given", () => {
    const customAlt = "Custom alt text";
    render(<PostHeroImage alt={customAlt} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", customAlt);
  });

  it("should handle undefined src prop correctly", () => {
    render(<PostHeroImage src={undefined} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", DUMMY_IMAGE);
  });

  it("should handle all props together", () => {
    const props = {
      src: "https://example.com/test.jpg",
      alt: "Test image description",
      className: "custom-hero-class",
    };

    render(<PostHeroImage {...props} />);

    const image = screen.getByRole("img");
    const container = image.parentElement;

    expect(image).toHaveAttribute("src", props.src);
    expect(image).toHaveAttribute("alt", props.alt);
    expect(container).toHaveClass("custom-hero-class");
  });
});
