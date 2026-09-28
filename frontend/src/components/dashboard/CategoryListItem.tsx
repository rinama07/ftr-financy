import clsx from "clsx";

import type { DashboardCategory } from "@/lib/graphql/dashboard/types";
import { formatCurrency } from "@/utils/currency";

interface CategoryListItemProps {
  badge?: string;
  category: DashboardCategory;
}

export function CategoryListItem({ badge, category }: CategoryListItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-3 sm:flex-nowrap">
      <div className="min-w-0 flex-1">
        <span
          className={clsx("rounded-full py-1 px-3 text-xs font-medium", badge)}
        >
          {category.title}
        </span>
      </div>

      <span className="whitespace-nowrap text-sm text-gray-500">
        {category.transactionsCount}{" "}
        {category.transactionsCount === 1 ? "item" : "itens"}
      </span>

      <span className="min-w-21 text-end whitespace-nowrap text-sm font-semibold text-gray-900">
        {formatCurrency(category.transactionsBalance ?? 0)}
      </span>
    </div>
  );
}
