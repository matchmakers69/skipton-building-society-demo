import { safeJsonParse } from "@/utils";
import { Post } from "./defs/post";
import { API_URL } from "@/constants";

export async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    next: {
      revalidate: 60,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 404) {
    throw new Error("Post not found");
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
  }

  const data = await safeJsonParse(res);
  return data as Post;
}
