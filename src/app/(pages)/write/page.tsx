import Write from "@/components/Write";
import { getData } from "@/constants";
import { Category } from "@/types";

interface BlogProps {
  searchParams: {
    cat: string;
  };
}

export default async function WritePage({ searchParams }: BlogProps) {
  const categories = (await getData("categories")) as Category[];

  const { cat } = searchParams;

  return <Write categories={categories} cat={cat} type="create" />;
}
