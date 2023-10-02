import Link from "next/link";
import { Category } from "@/types";
import { getData } from "@/constants";

interface MenuCategoriesProps {
  title: string;
  subtitle?: string;
}

const MenuCategories = async ({ title, subtitle }: MenuCategoriesProps) => {
  const categories = (await getData("categories")) as Category[];
  if (categories.length <= 0) return;

  return (
    <div className="my-12">
      <h2 className="text-sm font-normal text-gray-400">{subtitle}</h2>
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="mt-5 grid grid-cols-3 place-items-center gap-5">
        {categories?.map(({ title, slug }, index) => (
          <Link
            href={`/blog?cat=${slug}`}
            className={`flex h-10 w-full items-center justify-center gap-3 rounded-xl bg-gray-100 px-3 capitalize text-black dark:bg-gray-200`}
            key={index}
          >
            <p className="text-sm font-medium">{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
