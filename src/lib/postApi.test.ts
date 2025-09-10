import { beforeEach, expect, it, vi } from "vitest";
import { fetchPost } from "./postApi";
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
        if (url.endsWith("/posts/1")) {
          return new Response(JSON.stringify(POSTS[0]), {
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

  it("should fetchPost function return single post", async () => {
    const post = await fetchPost(1);
    expect(post.id).toBe(1);
  });

  it("should fetchPost function throw on 404", async () => {
    await expect(fetchPost(999)).rejects.toThrow(/not found/i);
  });

  it("should call fetchPost with correct URL and options", async () => {
    const mockFetch = vi.mocked(fetch);

    await fetchPost(1);

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/posts/1`, {
      next: {
        revalidate: 60,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
