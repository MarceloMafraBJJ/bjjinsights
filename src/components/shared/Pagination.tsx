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
        accentColor="bg-accent disabled:bg-accent/50 hover:bg-accent/90"
      >
        Anterior
      </Button>

      <Button
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
        accentColor="bg-accent disabled:bg-accent/50 hover:bg-accent/90"
      >
        Próximo
      </Button>
    </div>
  );
};

export default Pagination;
