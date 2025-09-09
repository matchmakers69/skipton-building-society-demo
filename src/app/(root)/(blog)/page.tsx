import { PageTitle } from "@/componets/ui/PageTitle";
import { PostsList } from "./_components";
import { fetchPosts } from "@/lib/postsApi";

export default function BlogPage() {
  return (
    <>
      <PageTitle title="Welcome to Skipton Blog" className="bg-light-blue" />
      {/* 
        PostsList receives a fetcher function as a prop. 
        ✅ Benefits:
        - Decouples data fetching from the component layout.
        - Makes it easy to swap the data source (e.g., for testing or future APIs).
        - Keeps the component simple and focused on rendering.
      */}
      <PostsList fetchData={fetchPosts} />
    </>
  );
}
