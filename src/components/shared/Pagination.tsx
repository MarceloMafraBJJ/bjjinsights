"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = ({ page, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrev}
      >
        Anterior
      </Button>

      <Button
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Próximo
      </Button>
    </div>
  );
};

export default Pagination;
