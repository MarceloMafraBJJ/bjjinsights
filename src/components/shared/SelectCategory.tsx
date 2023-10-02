"use client";

import { Fragment, useState, startTransition, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Category, Subcategory } from "@/types";
import { usePathname, useRouter } from "next/navigation";

interface SelectCategoryProps {
  categories: Category[];
  cat: string;
}

interface CategoryOptionProps {
  category: Category;
  onSubcategorySelection: (selectedSubcategory: string) => void;
}

interface SubcategoryListProps {
  subcategories: Subcategory[];
  onSubcategorySelection: (selectedSubcategory: string) => void;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const SelectCategory = ({ categories, cat }: SelectCategoryProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState<string>(cat || "");

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);

    if (term) {
      params.set("cat", term);
    } else {
      params.delete("cat");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleSubcategorySelection = (selectedSubcategory: string) => {
    setSelectedCategory(selectedSubcategory);
    handleSearch(selectedSubcategory);
  };

  useEffect(() => {
    handleSearch(selectedCategory);
  }, [selectedCategory]);

  return (
    <Listbox value={selectedCategory} onChange={handleSearch}>
      {({ open }) => (
        <>
          <div className="relative flex w-[100%] justify-start md:w-[280px]">
            <Listbox.Button className="bg-secondary relative h-[40px] w-[100%] cursor-pointer rounded-md text-left shadow-sm md:w-[280px]">
              <span className="ml-3 text-sm">
                {cat || "Selecione uma categoria"}
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-out duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-30 mt-1 w-[280px] rounded-md bg-white py-1 text-base shadow-lg">
                {categories.map((category) => (
                  <CategoryOption
                    key={category.id}
                    category={category}
                    onSubcategorySelection={handleSubcategorySelection}
                  />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

const CategoryOption = ({
  category,
  onSubcategorySelection,
}: CategoryOptionProps) => (
  <Listbox.Option
    key={category.id}
    className={({ active }) =>
      classNames(
        active ? "bg-gray-200 text-gray-900" : "text-gray-900",
        "cursor-pointer select-none px-4 py-2",
      )
    }
    value={category.title}
  >
    {({ selected, active }) => (
      <>
        <div className="flex items-center">
          <span
            className={classNames(
              selected ? "font-medium" : "font-normal",
              "ml-2",
            )}
          >
            {category.title}
          </span>
        </div>

        {selected ? (
          <span
            className={classNames(
              active ? "text-default_text" : "text-default_text",
              "absolute inset-y-0 right-0 flex items-center pl-3",
            )}
          >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}

        {category.subcategories && (
          <SubcategoryList
            subcategories={category.subcategories}
            onSubcategorySelection={onSubcategorySelection}
          />
        )}
      </>
    )}
  </Listbox.Option>
);

const SubcategoryList = ({
  subcategories,
  onSubcategorySelection,
}: SubcategoryListProps) => (
  <Listbox as="div" className="mt-1">
    <Listbox.Button className="relative h-[40px] w-[100%] cursor-pointer rounded-md bg-gray-100 text-left shadow-sm">
      <span className="ml-3 text-sm">Subcategoria</span>
    </Listbox.Button>
    <Transition
      as={Fragment}
      enter="transition ease-in duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-out duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-30 mt-1 w-[280px] rounded-md bg-white py-1 text-base shadow-lg">
        {subcategories.map((subCategory) => (
          <Listbox.Option
            key={subCategory.id}
            className={({ active }) =>
              classNames(
                active ? "bg-gray-200 text-gray-900" : "text-gray-900",
                "cursor-pointer select-none px-4 py-2",
              )
            }
            value={subCategory.title}
            onClick={() => onSubcategorySelection(subCategory.title)}
          >
            {({ selected, active }) => (
              <>
                <div className="flex items-center">
                  <span
                    className={classNames(
                      selected ? "font-medium" : "font-normal",
                      "ml-2",
                    )}
                  >
                    {subCategory.title}
                  </span>
                </div>

                {selected ? (
                  <span
                    className={classNames(
                      active ? "text-green-600" : "text-green-600",
                      "absolute inset-y-0 left-0 flex items-center pl-3",
                    )}
                  >
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Transition>
  </Listbox>
);

export default SelectCategory;
