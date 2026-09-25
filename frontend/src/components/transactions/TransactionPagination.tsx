import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type TransactionPaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export function TransactionPagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: TransactionPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalItems === 0) {
    return (
      <div className="flex items-center justify-between border-t px-6 py-4 text-sm text-gray-600">
        <span>0 resultados</span>
      </div>
    );
  }

  const from = (page - 1) * pageSize + 1;

  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-gray-600">
        {from} a {to} | {totalItems} resultados
      </span>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={page === 1}
          aria-label="Página anterior"
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft />
        </Button>

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
          .map((pageNumber) => (
            <Button
              key={pageNumber}
              type="button"
              variant={pageNumber === page ? "default" : "outline"}
              size="icon-sm"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={page === totalPages}
          aria-label="Próxima página"
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
