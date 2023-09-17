import { Post } from "@/types";
import { Pagination, Card } from "../components";
import { getData } from "@/constants";

interface CardListProps {
  page: number;
  cat?: string;
  search?: string;
}

const CardList = async ({ page, cat, search }: CardListProps) => {
  const { posts, count } = (await getData(
    `posts?page=${page}&cat=${cat || ""}`,
  )) as {
    posts: Post[];
    count: number;
  };

  const POST_PER_PAGE = 4;
  const hasPrev = POST_PER_PAGE * (page - 1) > 1;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  const filteredPosts = posts?.filter((post) => {
    const titleLowerCase = post.title.toLowerCase();
    const descLowerCase = post.desc.toLowerCase();

    const catMatches = !cat || post.catSlug === cat;

    const searchMatches =
      !search ||
      titleLowerCase.includes(search.toLowerCase()) ||
      descLowerCase.includes(search.toLowerCase());

    return catMatches && searchMatches;
  });

  return (
    <div className="flex-[2]">
      <h1 className="my-2 text-2xl font-semibold md:my-8">
        {filteredPosts?.length != 0
          ? "Postagens recentes"
          : "Ooops, sem postagens nesta categorias."}
      </h1>

      <div className="">
        {filteredPosts?.map((post) => <Card key={post.id} {...post} />)}
      </div>

      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
