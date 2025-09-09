import { safeJson } from "@/utils";
import { Post, PostsSchema } from "./defs/post";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: {
      revalidate: 60,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  const data = await safeJson(res);
  const parsed = PostsSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Posts response did not match expected schema");
  }

  return parsed.data;
}
