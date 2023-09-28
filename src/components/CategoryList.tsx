import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";
import { getData } from "@/constants";

interface CategoryListProps {
  title: string;
}

const CategoryList = async ({ title }: CategoryListProps) => {
  const categories = (await getData("categories")) as Category[];

  return (
    <div className="my-12">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="w-full">
        <div className="scrollbar-[2px] mt-5 flex gap-x-4 overflow-x-auto p-2 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#eee]">
          {categories?.map(({ title, slug }, index) => {
            return (
              <Link
                href={`/blog?cat=${slug}`}
                className={`flex h-12 w-full min-w-[100px] items-center justify-center gap-3 rounded-xl bg-gray-100 px-4 capitalize text-dark_primary shadow-sm hover:opacity-90 lg:min-w-[200px]`}
                key={index}
              >
                <p className="text-center text-sm font-semibold uppercase lg:text-base">
                  {title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
