type Post = {
  id: number;
  slug?: string | null;
  url?: string | null;
  title: string;
  content: string;
  image?: string | null;
  thumbnail?: string | null;
  status?: "draft" | "published" | "archived" | null;
  category?: string | null;
  publishedAt: string;
  updatedAt?: string | null;
  userId?: number | null;
};

export type { Post };
