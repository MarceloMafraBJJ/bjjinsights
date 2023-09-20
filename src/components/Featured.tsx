import { getData, removeHTMLTags } from "@/constants";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const Featured = async () => {
  const { post } = (await getData(`posts/featured`)) as {
    post: Post;
  };

  if (!post) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="text-3xl font-medium tracking-wider md:text-5xl lg:text-8xl">
        Desvende os segredos do <b>Jiu-Jitsu</b> e domine o <b>tatame</b>
      </div>

      <div className="mt-16 flex flex-col items-start gap-10 lg:flex-row">
        <Link
          href={`/posts/${post.slug}`}
          className="relative h-[200px] w-full md:h-[350px] md:w-[500px]"
        >
          <Image
            src={post.img!}
            alt="Post Image"
            fill
            className="aspect-auto rounded-md"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-5">
          <h1 className="text-lg font-semibold lg:text-3xl">{post.title}</h1>

          <p className="hidden text-lg font-light md:block">
            {removeHTMLTags(post.desc).substring(0, 350)}..
          </p>

          <p className="block text-lg font-light md:hidden">
            {removeHTMLTags(post.desc).substring(0, 150)}..
          </p>

          <Link
            href={`/posts/${post.slug}`}
            className="max-w-max border-b border-accent font-medium"
          >
            Ler mais
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
