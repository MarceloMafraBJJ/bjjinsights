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
          {categories?.map(({ title, slug, img }, index) => {
            return (
              <Link
                href={`/blog?cat=${slug}`}
                className={`flex h-12 w-full min-w-[100px] items-center justify-center gap-3 rounded-xl bg-[#dee2e6] px-4 capitalize text-dark_primary shadow hover:opacity-90 lg:min-w-[200px]`}
                key={index}
              >
                {img && (
                  <Image
                    src={img}
                    alt={title}
                    width={56}
                    height={56}
                    className="h-8 w-8 rounded-full md:h-14 md:w-14"
                  />
                )}

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
