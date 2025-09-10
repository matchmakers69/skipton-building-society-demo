import { DUMMY_IMAGE } from "@/constants";
import Image from "next/image";

interface PostHeroImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const PostHeroImage = ({
  src,
  alt = "Post hero image",
  className = "",
}: PostHeroImageProps) => {
  const imageSrc = src || DUMMY_IMAGE;

  return (
    <div
      className={`relative h-64 w-full sm:h-80 md:h-96 lg:h-[40rem] ${className}`}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
        priority
      />
      <div className="absolute inset-0 bg-black/25"></div>
    </div>
  );
};

export default PostHeroImage;
