import { ArrowRight } from "lucide-react";

import { CATEGORY_COLORS } from "@/components/categories/category.constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DashboardCategory } from "@/lib/graphql/dashboard/types";
import { ROUTES } from "@/routes";
import { formatCurrency } from "@/utils/currency";
import { Link } from "react-router";

type DashboardCategoriesProps = {
  categories: DashboardCategory[];
};

export function DashboardCategories({ categories }: DashboardCategoriesProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Categorias
        </h2>

        <Link to={ROUTES.private.categories}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 px-2 text-brand-base"
          >
            Gerenciar
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-gray-500">
          Nenhuma categoria encontrada.
        </div>
      ) : (
        <div className="divide-y">
          {categories.map((category) => {
            const categoryTheme =
              CATEGORY_COLORS[category.color] ?? CATEGORY_COLORS.blue;

            return (
              <div
                key={category.title}
                className="flex items-center gap-3 px-6 py-4"
              >
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${categoryTheme.badge}`}
                >
                  {category.title}
                </span>

                <span className="ml-auto whitespace-nowrap text-sm text-gray-500">
                  {category.transactionsCount}{" "}
                  {category.transactionsCount === 1 ? "item" : "itens"}
                </span>

                <span className="whitespace-nowrap text-sm font-semibold text-gray-900">
                  {formatCurrency(category.transactionsBalance ?? 0)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
