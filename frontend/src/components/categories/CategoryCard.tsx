import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Category } from "@/types";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_COLOR,
  DEFAULT_CATEGORY_ICON,
} from "./category.constants";

type CategoryCardProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const Icon = CATEGORY_ICONS[category.icon_name] ?? DEFAULT_CATEGORY_ICON;
  const theme = CATEGORY_COLORS[category.color] ?? DEFAULT_CATEGORY_COLOR;

  const transactionLabel = category.transactionsCount == 1 ? "item" : "itens";

  return (
    <Card className="flex h-full flex-col p-6 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${theme.icon}`}
        >
          <Icon className="size-5" />
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={`Excluir ${category.title}`}
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(category)}
          >
            <Trash2 />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={`Editar ${category.title}`}
            onClick={() => onEdit(category)}
          >
            <Pencil />
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-semibold text-gray-900">
          {category.title}
        </h2>

        <p className="mt-1 min-h-10 text-sm leading-5 text-gray-600">
          {category.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${theme.badge}`}
        >
          {category.title}
        </span>

        <span className="text-sm text-gray-500">
          {category.transactionsCount ?? 0} {transactionLabel}
        </span>
      </div>
    </Card>
  );
}
