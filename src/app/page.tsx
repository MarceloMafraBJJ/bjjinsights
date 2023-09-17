import { CardList, CategoryList, Featured, Menu } from "../components";

interface HomeProps {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div>
      <Featured />
      <CategoryList title="Popular Categories" />

      <div className="flex gap-14">
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
