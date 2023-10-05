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
    `posts?cat=${cat}&search=${search}&page=${page}`,
  )) as {
    posts: Post[];
    count: number;
  };

  const POST_PER_PAGE = 8;
  const hasPrev = POST_PER_PAGE * (page - 1) > 1;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex-[2]">
      <h1 className="my-8 text-2xl font-semibold">
        {posts?.length != 0
          ? "Postagens recentes"
          : "Ooops, sem postagens nesta categorias."}
      </h1>

      {posts?.map((post) => <PostCard key={post.id} {...post} />)}

      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default PostCardList;
