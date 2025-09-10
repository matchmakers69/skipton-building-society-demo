import { render, screen } from "@testing-library/react";
import ShowPost from "./ShowPost";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GRAVATAR_URL } from "@/constants";

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

vi.mock("@/components/PostHeroImage", () => ({
  default: ({ src }: { src: string }) => (
    <div data-testid="post-card-hero">{src}</div>
  ),
}));

const mockFetchPost = vi.fn();
vi.mock("@/lib/postApi", () => ({
  fetchPost: (...args: any[]) => mockFetchPost(...args),
}));

describe("<ShowPost />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPost = {
    id: 1,
    title: "Hello World",
    category: "Tech",
    image: "https://example.com/hero.jpg",
    thumbnail: "https://example.com/thumb.jpg",
    publishedAt: "04/02/2023 13:25:21",
    content: "Some content.",
  };

  it("should render post data", async () => {
    mockFetchPost.mockResolvedValueOnce(mockPost);

    render(await ShowPost({ id: 1 }));

    expect(await screen.findByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Some content.")).toBeInTheDocument();
  });

  it("should use GRAVATAR_URL when thumbnail is missing", async () => {
    mockFetchPost.mockResolvedValueOnce({ ...mockPost, thumbnail: null });

    render(await ShowPost({ id: 1 }));

    const img = screen.getByAltText("Hello World") as HTMLImageElement;
    expect(img.src).toContain(GRAVATAR_URL);
  });

  it("should render 'Post not found.' when fetchPost returns null", async () => {
    mockFetchPost.mockResolvedValueOnce(null);

    render(await ShowPost({ id: 42 }));

    expect(screen.getByText("Post not found.")).toBeInTheDocument();
  });
});
