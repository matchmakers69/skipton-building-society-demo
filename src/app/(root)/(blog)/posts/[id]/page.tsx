import { Suspense } from "react";
import { ShowPost } from "../../_components";
import { Button } from "@/componets/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PostDetailsPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function PostDetailsPage({
  params,
}: PostDetailsPageProps) {
  const { id } = await params;
  return (
    <div className="wrapper">
      <div className="back-button-wrapprer py-10">
        <Button
          className="bg-black text-white"
          asChild
          variant="link"
          size="sm"
          data-testid="back-link"
        >
          <Link className="flex items-center" href="/">
            <ArrowLeft color="#fff" />
            <span className="ml-3 inline-block">Back to topic page</span>
          </Link>
        </Button>
      </div>

      {/* Suspense is used to show a fallback UI while ShowPost fetches its data asynchronously.
        ✅ Benefits:
        - Prevents layout from jumping while data is loading.
        - Provides a user-friendly loading state without manually handling state.
        - Makes it easier to integrate with React's concurrent features. */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <ShowPost id={id} />
      </Suspense>
    </div>
  );
}
