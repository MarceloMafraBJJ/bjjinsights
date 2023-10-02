import { Post } from "@/types";
import { Pagination } from "../shared";
import { PostCard } from "../posts";
import { getData } from "@/constants";

interface PostCardListProps {
  page: number;
  cat?: string;
  search?: string;
}

const PostCardList = async ({ page, cat, search }: PostCardListProps) => {
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

    const searchMatches =
      !search ||
      titleLowerCase.includes(search.toLowerCase()) ||
      descLowerCase.includes(search.toLowerCase());

    return searchMatches;
  });

  return (
    <div className="flex-[2]">
      <h1 className="my-2 text-2xl font-semibold md:my-8">
        {filteredPosts?.length != 0
          ? "Postagens recentes"
          : "Ooops, sem postagens nesta categorias."}
      </h1>

      {filteredPosts?.map((post) => <PostCard key={post.id} {...post} />)}

      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default PostCardList;