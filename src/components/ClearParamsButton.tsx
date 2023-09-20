"use client";

import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";

const ClearParamsButton = () => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    let params = new URLSearchParams(window.location.search);

    params.delete("cat");
    params.delete("search");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <button>
      <ArrowPathRoundedSquareIcon
        className="h-4 w-4"
        onClick={() => handleSearch()}
      />
    </button>
  );
};

export default ClearParamsButton;
