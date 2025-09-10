import { formatDateString } from "@/utils";
import { DUMMY_IMAGE, GRAVATAR_URL } from "@/constants";
import Image from "next/image";
import PostHeroImage from "./PostHeroImage";
import { fetchPost } from "@/lib/postApi";

type ShowPostProps = {
  id: number;
};
export default async function ShowPost({ id }: ShowPostProps) {
  const post = await fetchPost(id);
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <>
      <div className="post-title-header mb-20 pt-20">
        <h1 className="text-center text-black">{post.title}</h1>
      </div>

      <div className="post-card-hero-section mb-20">
        <PostHeroImage src={post.image ?? DUMMY_IMAGE} />
      </div>
      <article className="wrapper-narrow mb-20">
        <div className="articel-header mb-6 flex items-center justify-between gap-2">
          <div className="category-wrapper flex items-center gap-2">
            <p className="text-sm font-medium text-black">Category:</p>
            <p className="text-sm font-medium text-black">
              {post.category ?? "Uncategorized"}
            </p>
          </div>
          <div className="details-wrapper flex items-center gap-2">
            <div className="relative m-auto h-16 w-16 overflow-hidden rounded-full">
              <Image
                className="object-cover"
                src={post.thumbnail ?? GRAVATAR_URL}
                alt={post.title}
                priority={true}
                fill={true}
              />
            </div>
            <div className="published flex items-center gap-2">
              <p className="text-medium-grey text-base font-medium">
                Published at:
              </p>
              <span className="text-medium-grey text-base">
                {formatDateString(post.publishedAt)}
              </span>
            </div>
          </div>
        </div>
        <p>{post.content}</p>
      </article>
    </>
  );
}
