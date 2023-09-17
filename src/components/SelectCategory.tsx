"use client";

import { Fragment, startTransition } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Category } from "@/types";
import { usePathname, useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SelectCategory = ({
  categories,
  cat,
}: {
  categories: Category[];
  cat: string;
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    let params = new URLSearchParams(window.location.search);

    if (term) {
      params.set("cat", term);
    } else {
      params.delete("cat");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Listbox value={cat} onChange={handleSearch}>
      {({ open }) => (
        <>
          <div className="relative flex w-[100%] justify-start">
            <Listbox.Button className="relative h-[40px] w-[100%] cursor-default rounded-md bg-[#eee] text-left shadow-sm dark:bg-[#4444] md:w-[200px]">
              <span className="ml-5 block truncate capitalize">
                {cat || categories[0].slug}
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-30 mt-3 max-h-56 w-[90%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg md:w-[200px]">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-[#4444] text-black" : "text-black",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={category.slug}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate",
                            )}
                          >
                            {category.title}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-black",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
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
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectCategory;
