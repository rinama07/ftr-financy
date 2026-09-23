import {
  BriefcaseBusiness,
  Car,
  HeartPulse,
  Package,
  Pencil,
  PiggyBank,
  ShoppingCart,
  Tag,
  Ticket,
  Trash2,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

const iconMap = {
  food: Utensils,
  entertainment: Ticket,
  investment: PiggyBank,
  market: ShoppingCart,
  salary: BriefcaseBusiness,
  health: HeartPulse,
  transport: Car,
  utilities: Package,
} as const;

const colorMap = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  pink: {
    icon: "bg-pink-100 text-pink-600",
    badge: "bg-pink-100 text-pink-700",
  },
  green: {
    icon: "bg-green-100 text-green-600",
    badge: "bg-green-100 text-green-700",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    badge: "bg-orange-100 text-orange-700",
  },
  red: {
    icon: "bg-red-100 text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    badge: "bg-purple-100 text-purple-700",
  },
  yellow: {
    icon: "bg-yellow-100 text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700",
  },
} as const;

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const Icon = iconMap[category.icon_name as keyof typeof iconMap] ?? Tag;

  const theme =
    colorMap[category.color as keyof typeof colorMap] ?? colorMap.blue;

  const transactionLabel = category.transactionsCount === 1 ? "item" : "itens";

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
          {category.transactionsCount} {transactionLabel}
        </span>
      </div>
    </Card>
  );
}
