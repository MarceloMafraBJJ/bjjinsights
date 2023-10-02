import { getData } from "@/constants";
import { Category } from "@/types";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Write } from "@/components/profile";

interface BlogProps {
  searchParams: {
    cat: string;
  };
}

export default async function WritePage({ searchParams }: BlogProps) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }

  const categories = (await getData("categories")) as Category[];
  const { cat } = searchParams;

  return <Write categories={categories} cat={cat} type="create" />;
}
