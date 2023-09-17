import { Comments, Menu } from "@/components";
import LikeButton from "@/components/LikeButton";
import { getData } from "@/constants";
import { Post } from "@/types";
import { getAuthSession } from "@/utils/auth";
import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { post } = (await getData(`posts/${slug}`)) as {
    post: Post;
  };

  const data = await getAuthSession();

  return (
    <div>
      <div className="flex flex-col-reverse items-start gap-14 md:flex-row md:items-center">
        <div className="flex-1">
          <h1 className="pb-12 text-3xl font-semibold md:text-2xl xl:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {post.user.image && (
                <div className="relative h-12 w-12">
                  <Image
                    src={post.user.image}
                    alt="user avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col items-start justify-center gap-1 text-gray-400">
                <span className="text-lg font-semibold">{post.user.name}</span>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-x-2 text-gray-400">
              <LikeButton postId={post.id} />

              <span className="text-lg font-semibold">
                {post.likesCount || "0"} Likes
              </span>

              <span className="text-lg font-semibold">{post.views} Views</span>
            </div>

            {data?.user?.email == post.userEmail && (
              <Link
                href={`/posts/edit/${post.slug}`}
                className="flex max-w-max gap-2 rounded-md bg-accent_secondary px-4 py-2"
              >
                <PencilIcon className="h-6 w-6" /> Editar Postagem
              </Link>
            )}
          </div>
        </div>

        {post.img && (
          <div className="relative h-[400px] w-full lg:max-w-[500px] lg:flex-1">
            <Image
              src={post.img}
              alt="post image"
              fill
              className="aspect-auto rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex gap-12">
        <div className="mt-16 flex-[2]">
          <div
            className="space-y-2"
            dangerouslySetInnerHTML={{ __html: post.desc }}
          />

          <div>
            <Comments postSlug={post.slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}
