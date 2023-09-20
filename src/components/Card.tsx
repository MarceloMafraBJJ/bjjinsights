import { removeHTMLTags } from "@/constants";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Card = ({ catSlug, title, desc, createdAt, slug, img }: Post) => {
  return (
    <div className="mb-14 flex flex-col items-center gap-5 rounded-lg p-5 opacity-80 shadow-md transition-all hover:opacity-100 dark:shadow-2xl md:flex-row md:gap-14">
      {img && (
        <Link
          href={`/posts/${slug}`}
          className="relative h-[200px] w-full md:h-[300px] md:w-[300px]"
        >
          <Image src={img} alt="" fill className="aspect-auto rounded-md" />
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="space-x-2">
          <span className="text-gray-400">{createdAt.substring(0, 10)} -</span>
          <Link
            href={`/blog?cat=${catSlug}`}
            className="font-medium uppercase text-accent"
          >
            {catSlug}
          </Link>
        </div>

        <Link href={`/posts/${slug}`}>
          <h1 className="text-sm font-semibold md:text-2xl">{title}</h1>
        </Link>

        <p className="text-sm font-light md:text-lg">
          {removeHTMLTags(desc).substring(0, img ? 100 : 180)}..
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
