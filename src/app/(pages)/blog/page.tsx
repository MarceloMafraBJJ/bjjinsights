import { PostCardList } from "@/components/posts";
import { Search, SelectCategory, ClearParamsButton } from "@/components/shared";
import { MenuAside } from "@/components/shared/MenuAside";

import { getData } from "@/constants";
import { Category } from "@/types";

interface BlogProps {
  searchParams: {
    page: string;
    search: string;
    cat: string;
  };
}

export default async function Blog({ searchParams }: BlogProps) {
  const categories = (await getData("categories")) as Category[];

  const page = parseInt(searchParams.page) || 1;
  const { cat, search } = searchParams;

  return (
    <div>
      <div className="flex w-full gap-x-2 font-light uppercase">
        <h2>Buscar entre:</h2>
        <h1 className="text-lg font-semibold uppercase text-accent md:text-3xl">
          {search || cat || "Todos os posts"}
        </h1>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 md:flex-row">
        <Search placeholder="Busque por postagens" />
        <div className="flex w-full gap-2">
          <SelectCategory categories={categories} cat={cat} />
          <ClearParamsButton />
        </div>
      </div>

      <div className="flex gap-14">
        <PostCardList
          page={page}
          cat={cat}
          search={search?.toLocaleLowerCase()}
        />
        <MenuAside />
      </div>
    </div>
  );
}
