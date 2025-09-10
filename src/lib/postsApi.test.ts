import { beforeEach, expect, it, vi } from "vitest";
import { fetchPosts } from "./postsApi";
import { API_URL } from "@/constants";

const POSTS = [
  {
    id: 1,
    title: "Hello",
    content: "World",
    slug: "hello",
    url: "/hello",
    publishedAt: "2025-09-09",
  },
  {
    id: 2,
    title: "Second",
    content: "Post",
    slug: "second",
    url: "/second",
    publishedAt: "2025-09-09",
  },
];

describe("fetchPosts API", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.endsWith("/posts")) {
          return new Response(JSON.stringify(POSTS), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response("Not found", {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }) as unknown as typeof fetch,
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return array of posts from API", async () => {
    const posts = await fetchPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Hello");
  });
  it("should call fetchPosts with correct URL and options", async () => {
    const mockFetch = vi.mocked(fetch);

    await fetchPosts();

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/posts`, {
      next: {
        revalidate: 60,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("should handle empty response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: new Headers({ "Content-Type": "application/json" }),
        });
      }) as unknown as typeof fetch,
    );

    const posts = await fetchPosts();
    expect(posts).toEqual([]);
    expect(posts).toHaveLength(0);
  });
  it("should throw error when fetch fails with 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        return new Response("Not Found", {
          status: 404,
          statusText: "Not Found",
        });
      }) as unknown as typeof fetch,
    );

    await expect(fetchPosts()).rejects.toThrow(
      "Failed to fetch posts: 404 Not Found",
    );
  });

  it("should throw error when fetch fails with 500", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        return new Response("Internal Server Error", {
          status: 500,
          statusText: "Internal Server Error",
        });
      }) as unknown as typeof fetch,
    );

    await expect(fetchPosts()).rejects.toThrow(
      "Failed to fetch posts: 500 Internal Server Error",
    );
  });
  it("should throw error when fetch fails with network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("Network error");
      }) as unknown as typeof fetch,
    );

    await expect(fetchPosts()).rejects.toThrow("Network error");
  });
});
