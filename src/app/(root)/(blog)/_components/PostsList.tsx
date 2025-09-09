import { Alert } from "@/componets/shared";
import { PostCard } from "./PostCard";
import { Post } from "@/lib/defs/post";

type PostsListProps = {
  fetchData: () => Promise<Post[]>;
};
// PostsList is async so it can directly await the data source.
// This makes the component reusable with *any* fetcher passed via props.
// (e.g. easy to mock in tests, or swap backend APIs later).

export const PostsList = async ({ fetchData }: PostsListProps) => {
  const posts = await fetchData();
  if (!posts) return null;
  // For now I just slice the first 12 posts to avoid rendering too many.
  // NOTE: JSONPlaceholder API itself *does not* support page or limit params,
  // A proper solution would be to implement pagination and query parameters
  // once a more reliable backend API is available.
  const limitedPosts = posts.slice(0, 12);

  if (!limitedPosts.length) {
    return (
      <Alert data-testid="posts-missing-data" type="info">
        Sorry, but there are no posts yet.
      </Alert>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 items-stretch gap-8 px-[3rem] py-[3rem] md:grid-cols-2 lg:grid-cols-4">
        {limitedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            data-testid={`post-card-${post.id}`}
          />
        ))}
      </div>
    </>
  );
};
