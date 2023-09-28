import { getVideoID, removeHTMLTags } from "@/constants";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  catSlug,
  title,
  desc,
  createdAt,
  slug,
  img,
  videoURL,
}: Post) => {
  const videoID = getVideoID(videoURL);

  return (
    <div className="mb-14 flex flex-col items-center gap-5 rounded-lg p-5 opacity-90 shadow transition-all hover:opacity-100 dark:shadow-2xl lg:flex-row lg:gap-14">
      <Link
        href={`/posts/${slug}`}
        className="relative h-[200px] w-full lg:h-full lg:min-h-[300px] lg:w-[300px]"
      >
        <Image
          src={img || `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
          alt=""
          fill
          className="rounded-md object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <div className="space-x-2 text-xs md:text-sm">
          <span className="text-gray-400">{createdAt.substring(0, 10)} -</span>
          <Link
            href={`/blog?cat=${catSlug}`}
            className="font-medium uppercase text-accent"
          >
            {catSlug}
          </Link>
        </div>

        <Link href={`/posts/${slug}`}>
          <h1 className="text-sm font-semibold lg:text-2xl">{title}</h1>
        </Link>

        <p className="text-sm font-light lg:text-lg">
          {removeHTMLTags(desc).substring(0, 100)}..
        </p>

        <Link
          href={`/posts/${slug}`}
          className="max-w-max border-b border-accent"
        >
          Ler mais
        </Link>
      </div>
    </div>
  );
};

export default Card;
