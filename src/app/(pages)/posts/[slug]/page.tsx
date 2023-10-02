import Image from "next/image";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/solid";

import { getAuthSession } from "@/utils/auth";
import { getData } from "@/constants";
import { Post } from "@/types";

import { LikeButton, PostSlider, Comments } from "@/components/posts";
import { MenuAside } from "@/components/shared/MenuAside";
import { Button, ReportButton } from "@/components/shared";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { post } = (await getData(`posts/${slug}`)) as {
    post: Post;
  };

  console.log(post);

  const data = await getAuthSession();

  return (
    <main>
      <div className="flex flex-col-reverse items-start gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex-1">
          <h1 className="pb-8 text-2xl font-semibold md:pb-12 md:text-3xl xl:text-5xl">
            {post?.title}
          </h1>

          <div className="flex flex-col gap-4">
            <Link
              href={`/profile?email=${post?.user?.email}`}
              className="flex gap-4"
            >
              {post?.user.image && (
                <div className="relative h-12 w-12">
                  <Image
                    src={post?.user.image}
                    alt="user avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col items-start justify-center text-zinc-400">
                <span className="text-lg font-semibold">{post?.user.name}</span>
              </div>
            </Link>

            <div className="mt-4 flex items-center gap-x-2 text-zinc-400">
              <LikeButton postId={post?.id} />

              <span className="text-lg font-semibold">
                {post?.likesCount || "0"} Likes
              </span>

              <span className="text-lg font-semibold">{post?.views} Views</span>

              <ReportButton userEmail={data?.user?.email!} post={post} />
            </div>

            {data?.user?.email == post?.userEmail && (
              <Link href={`/posts/edit/${post.slug}`}>
                <Button className="flex gap-4">
                  <PencilIcon className="h-6 w-6" /> Editar Postagem
                </Button>
              </Link>
            )}
          </div>
        </div>

        <PostSlider post={post || null} />
      </div>

      <div className="flex gap-12">
        <div className="mt-8 flex-[2] lg:mt-16">
          <div
            className="space-y-2"
            dangerouslySetInnerHTML={{ __html: post?.desc }}
          />

          <div>
            <Comments postSlug={post?.slug} />
          </div>
        </div>
        <MenuAside />
      </div>
    </main>
  );
}
