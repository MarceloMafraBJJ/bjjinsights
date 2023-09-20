import { getData, removeHTMLTags } from "@/constants";
import { Post } from "@/types";
import { getAuthSession } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface BlogProps {
  searchParams: {
    email: string;
  };
}

export default async function Blog({ searchParams }: BlogProps) {
  const session = await getAuthSession();
  const { email } = searchParams;

  if (!session || !email || session?.user?.email != email) {
    return redirect("/");
  }

  const posts = (await getData(`posts/me?email=${email}`)) as Post[];

  return (
    <>
      <h1 className="my-5 text-3xl font-semibold uppercase md:my-10">
        Meus posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map(({ title, desc, img, slug }) => (
          <Link
            href={`/posts/${slug}`}
            className="mb-6 flex flex-col gap-5 rounded-lg p-5 opacity-80 shadow-md transition-all hover:opacity-100 dark:shadow-2xl md:gap-14"
          >
            <div className="relative h-[200px] w-full md:h-[300px]">
              <Image
                src={img || "/no-image.png"}
                alt=""
                fill
                className="aspect-auto rounded-md"
              />
            </div>

            <div className="flex flex-1 flex-col gap-4 md:gap-8">
              <h1 className="text-base font-semibold md:text-xl">{title}</h1>
              <p className="text-sm font-light md:text-lg">
                {removeHTMLTags(desc).substring(0, 100)}..
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
