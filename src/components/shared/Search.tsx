"use client";

import { useTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  placeholder: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    let params = new URLSearchParams(window.location.search);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="bg-secondary flex h-[40px] w-full items-center rounded-lg p-2 md:w-[300px]">
      <MagnifyingGlassIcon className="mx-2 h-4 w-6" />

      <input
        className="w-full rounded-md bg-transparent px-2 outline-none"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        onBlur={() => handleSearch(searchTerm)}
      />

      {/* Spinner Animation */}

      {isPending && (
        <svg
          className="-ml-1 mr-3 h-3 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
