import { ArrowUpDown, Tag, Utensils } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Category } from "@/types";
import { getCategoryStats } from "./category.utils";

type CategoryHighlightsProps = {
  categories: Category[];
};

export function CategoryHighlights({ categories }: CategoryHighlightsProps) {
  const { totalCategories, totalTransactions, mostUsedCategory } =
    getCategoryStats(categories);

  const highlights = [
    {
      icon: Tag,
      value: totalCategories,
      label: "Total de categorias",
      iconClassName: "text-gray-600",
    },
    {
      icon: ArrowUpDown,
      value: totalTransactions,
      label: "Total de transações",
      iconClassName: "text-violet-500",
    },
    {
      icon: Utensils,
      value: mostUsedCategory?.title ?? "Nenhuma",
      label: "Categoria mais utilizada",
      iconClassName: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {highlights.map(({ icon: Icon, value, label, iconClassName }) => (
        <Card
          key={label}
          className="flex min-h-26 flex-row items-start gap-4 p-6"
        >
          <Icon className={`size-8 ${iconClassName}`} />

          <div className="min-w-0">
            <span className="block truncate text-2xl font-bold text-gray-800">
              {value}
            </span>

            <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {label}
            </h2>
          </div>
        </Card>
      ))}
    </div>
  );
}
