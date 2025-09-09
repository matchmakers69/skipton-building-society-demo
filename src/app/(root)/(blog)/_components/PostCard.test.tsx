import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createElement } from "react";
import { PostCard } from "./PostCard";
import { Post } from "@/lib/defs/post";

vi.mock("@/componets/shared", () => {
  const Card = ({ children, ...props }: any) =>
    createElement("div", { "data-testid": "mock-card", ...props }, children);

  const CardTitle = ({ children, ...props }: any) =>
    createElement(
      "h2",
      { "data-testid": "mock-card-title", ...props },
      children,
    );

  const Button = ({ children, ...props }: any) =>
    createElement(
      "button",
      { "data-testid": "mock-button", ...props },
      children,
    );

  return { Card, CardTitle, Button };
});

vi.mock("next/link", () => ({
  default: ({ children, href }: any) =>
    createElement("a", { href, "data-testid": "mock-link" }, children),
}));

describe("<PostCard />", () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: "Post 1",
      content: "Content 1",
      category: "Tech",
      slug: "",
      url: "",
      publishedAt: "04/02/2023 13:25:21",
    },
    {
      id: 2,
      title: "Post 2",
      content: "Content 2",
      category: "Life",
      slug: "",
      url: "",
      publishedAt: "25/12/2022 13:10:07",
    },
    {
      id: 3,
      title: "Post 3",
      content: "Content 3",
      category: undefined,
      slug: "",
      url: "",
      publishedAt: "16/01/2023 07:25:47",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render post title, category, content, and published date", () => {
    render(<PostCard post={mockPosts[0]} data-testid="post-1" />);

    expect(screen.getByTestId("post-1")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("should render 'View more' button for post id=1", () => {
    render(<PostCard post={mockPosts[0]} data-testid="post-1" />);
    const button = screen.getByTestId("mock-button");
    expect(button).toHaveTextContent("View more");
    expect(button).not.toBeDisabled();
    expect(screen.getByTestId("mock-link")).toHaveAttribute("href", "posts/1");
  });

  it("should render 'Show error' button for post id=2", () => {
    render(<PostCard post={mockPosts[1]} data-testid="post-2" />);
    const button = screen.getByTestId("mock-button");
    expect(button).toHaveTextContent("Show error");
    expect(button).not.toBeDisabled();
    expect(screen.getByTestId("mock-link")).toHaveAttribute("href", "posts/2");
  });

  it("should disable button for other posts (id>2)", () => {
    render(<PostCard post={mockPosts[2]} data-testid="post-3" />);
    const button = screen.getByTestId("mock-button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Not available");
  });

  it("should show 'Uncategorized' when category is missing", () => {
    render(<PostCard post={mockPosts[2]} data-testid="post-3" />);
    expect(screen.getByText("Uncategorized")).toBeInTheDocument();
  });
});
