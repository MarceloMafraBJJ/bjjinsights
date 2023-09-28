import { getVideoID } from "@/constants";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MenuCard {
  showImage?: boolean;
  post: Post;
}

const MenuCard = ({ showImage = true, post }: MenuCard) => {
  const videoID = getVideoID(post.videoURL);

  return (
    <Link href={`/posts/${post.slug}`} className="flex items-center gap-5">
      {showImage && post.img && (
        <div className="relative aspect-square flex-1">
          <Image
            src={
              post.img ||
              `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`
            }
            alt="post image"
            fill
            className="rounded-full border-4 object-cover dark:border-accent_secondary"
          />
        </div>
      )}

      <div className="flex flex-[4] flex-col gap-1">
        <div className="flex items-center gap-x-2">
          <span className="max-w-max rounded-md bg-accent px-2 py-1 text-sm text-white">
            {post.catSlug}
          </span>
          <div className={"space-x-2 text-xs"}>
            <span>{post.views} Views</span>
            <span>{post.likesCount} Likes</span>
          </div>
        </div>

        <h3
          className={`my-2 ${showImage && post.img ? "text-base" : "text-lg"}`}
        >
          {post.title}
        </h3>

        <div className="space-x-2 text-sm">
          <span className="text-gray-400">{post.user?.name}</span>
          <span className="text-gray-400">
            - {post.createdAt.substring(0, 10)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
