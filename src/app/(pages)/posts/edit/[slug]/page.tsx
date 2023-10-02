import { Write } from "@/components/profile";
import { getData } from "@/constants";
import { Category, Post } from "@/types";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { cat: string };
}) {
  const { slug } = params;
  const { post } = (await getData(`posts/${slug}`)) as {
    post: Post;
  };
  const data = await getAuthSession();
  if (!data || data.user?.email != post.userEmail) return redirect("/");

  const categories = (await getData("categories")) as Category[];
  const { cat } = searchParams;

  return <Write cat={cat} categories={categories} post={post} type="edit" />;
}
