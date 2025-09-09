import { Button, Card, CardTitle } from "@/componets/shared";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { formatDateString } from "@/utils";
import { Post } from "@/lib/defs/post";

type PostCardProps = {
  post: Post;
  ["data-testid"]?: string;
};

export const PostCard = ({
  post,
  "data-testid": dataTestId,
}: PostCardProps) => {
  let buttonLabel = "Read more";
  let isDisabled = true;
  let href = `#`;
  let bgClass = "bg-medium-grey";

  if (post.id === 1) {
    buttonLabel = "View more";
    isDisabled = false;
    href = `posts/${post.id}`;
    bgClass = "bg-light-blue";
  } else if (post.id === 2) {
    buttonLabel = "Show error";
    isDisabled = false;
    bgClass = "bg-dark-red";
    href = `posts/${post.id}`;
  }
  return (
    <Card className="post-card">
      <div data-testid={dataTestId} className="post-card-top-section mb-6">
        <div className="card-header mb-10">
          <CardTitle className="text-md leading-[1.2] md:text-lg">
            {post.title}
          </CardTitle>
        </div>
        <div className="card-category mb-1 flex items-center gap-2">
          <p className="text-medium-grey text-xs font-medium">Category:</p>
          <span className="text-medium-grey text-xs">
            {post.category ?? "Uncategorized"}
          </span>
        </div>
        <div className="published flex items-center gap-2">
          <CalendarDays size={16} color="#cccccc" />
          <p className="text-medium-grey text-xs font-medium">Published at:</p>
          <span className="text-medium-grey text-xs">
            {formatDateString(post.publishedAt)}
          </span>
        </div>
      </div>
      <div className="card-content mb-12">
        <p className="line-clamp-3">{post.content}</p>
      </div>
      <footer className="card-footer mt-auto">
        {isDisabled ? (
          <Button
            className={`${bgClass} cursor-not-allowed text-white`}
            variant="link"
            size="sm"
            disabled
          >
            Not available
          </Button>
        ) : (
          <Button
            className={`${bgClass} text-white`}
            asChild
            variant="link"
            size="sm"
          >
            <Link href={href}>{buttonLabel}</Link>
          </Button>
        )}
      </footer>
    </Card>
  );
};
