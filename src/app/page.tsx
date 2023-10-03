import { CategoryList, Featured } from "../components/shared";
import { MenuAside } from "../components/shared/MenuAside";
import { PostCardList } from "../components/posts";

interface HomeProps {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div>
      <Featured />
      <CategoryList title="Popular Categories" />

      <div className="flex gap-14">
        <PostCardList page={page} />
        <MenuAside />
      </div>
    </div>
  );
}
