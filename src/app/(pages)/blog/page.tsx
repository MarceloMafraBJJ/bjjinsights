import { CardList, Menu } from "@/components";
import Search from "@/components/Seach";
import SelectCategory from "@/components/SelectCategory";
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
        <h1 className="text-3xl font-semibold uppercase text-accent">{cat}</h1>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 md:flex-row">
        <Search placeholder="Busque por postagens" />
        <SelectCategory categories={categories} cat={cat} />
      </div>

      <div className="flex gap-14">
        <CardList page={page} cat={cat} search={search?.toLocaleLowerCase()} />
        <Menu />
      </div>
    </div>
  );
}
