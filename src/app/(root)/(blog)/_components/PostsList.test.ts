import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PostsList } from "./PostsList";
import { createElement } from "react";
import { Post } from "@/lib/defs/post";

vi.mock("@/componets/shared", () => {
  const Alert = ({
    children,
    type,
    ...props
  }: {
    children?: React.ReactNode;
    type?: string;
  }) => {
    return createElement(
      "div",
      { "data-testid": "posts-missing-data", "data-type": type, ...props },
      children,
    );
  };
  return { Alert };
});

vi.mock("./PostCard", () => {
  const MockPostCard = ({ post }: { post: Post }) => {
    return createElement(
      "div",
      { "data-testid": `post-card-${post.id}` },
      createElement("h2", { key: "title" }, post.title),
      createElement("p", { key: "content" }, post.title),
    );
  };

  return { PostCard: MockPostCard };
});

const mockPosts: Post[] = [
  {
    id: 1,
    title: "First Post",
    content: "First post content",
    slug: "",
    url: "",
    publishedAt: "",
  },
  {
    id: 2,
    title: "Second Post",
    content: "Second post content",
    slug: "",
    url: "",
    publishedAt: "",
  },
  {
    id: 3,
    title: "Third Post",
    content: "Third post content",
    slug: "",
    url: "",
    publishedAt: "",
  },
  {
    id: 4,
    title: "Fourth Post",
    content: "Fourth post content",
    slug: "",
    url: "",
    publishedAt: "",
  },
  {
    id: 5,
    title: "Fifth Post",
    content: "Fifth post content",
    slug: "",
    url: "",
    publishedAt: "",
  },
];

describe("<PostsList />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render posts when fetchData returns posts", async () => {
    const mockFetchData = vi.fn().mockResolvedValue(mockPosts);

    render(await PostsList({ fetchData: mockFetchData }));

    expect(mockFetchData).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId("post-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("post-card-2")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "First Post",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Second Post",
      }),
    ).toBeInTheDocument();
  });
  it("should render all posts when less than 12 posts", async () => {
    const mockFetchData = vi.fn().mockResolvedValue(mockPosts);

    render(await PostsList({ fetchData: mockFetchData }));

    for (const post of mockPosts) {
      expect(screen.getByTestId(`post-card-${post.id}`)).toBeInTheDocument();

      const elements = screen.getAllByText(post.title);

      elements.forEach((el) => {
        expect(el).toBeInTheDocument();
      });
    }
  });

  it("should return null when fetchData returns null", async () => {
    const mockFetchData = vi.fn().mockResolvedValue(null);

    const { container } = render(await PostsList({ fetchData: mockFetchData }));

    expect(mockFetchData).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toBeNull();
  });
  it("should return null when fetchData returns undefined", async () => {
    const mockFetchData = vi.fn().mockResolvedValue(undefined);

    const { container } = render(await PostsList({ fetchData: mockFetchData }));

    expect(mockFetchData).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toBeNull();
  });

  it("should handle fetchData promise rejection", async () => {
    const mockFetchData = vi.fn().mockRejectedValue(new Error("API Error"));

    // This should throw since the component doesn't handle errors internally
    await expect(async () => {
      render(await PostsList({ fetchData: mockFetchData }));
    }).rejects.toThrow("API Error");

    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });

  it("should handle fetchData throwing synchronous error", async () => {
    const mockFetchData = vi.fn().mockImplementation(() => {
      throw new Error("Sync Error");
    });

    await expect(async () => {
      render(await PostsList({ fetchData: mockFetchData }));
    }).rejects.toThrow("Sync Error");
  });

  it("should handle exactly 12 posts (boundary condition)", async () => {
    const exactlyTwelvePosts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
      body: `Content ${i + 1}`,
    }));

    const mockFetchData = vi.fn().mockResolvedValue(exactlyTwelvePosts);

    render(await PostsList({ fetchData: mockFetchData }));

    for (let i = 1; i <= 12; i++) {
      expect(screen.getByTestId(`post-card-${i}`)).toBeInTheDocument();
    }
  });

  it("should show info alert when fetchData returns empty array", async () => {
    const mockFetchData = vi.fn().mockResolvedValue([]);

    render(await PostsList({ fetchData: mockFetchData }));

    expect(mockFetchData).toHaveBeenCalledTimes(1);

    const alert = screen.getByTestId("posts-missing-data");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("data-type", "info");
    expect(
      screen.getByText("Sorry, but there are no posts yet."),
    ).toBeInTheDocument();
  });
});
