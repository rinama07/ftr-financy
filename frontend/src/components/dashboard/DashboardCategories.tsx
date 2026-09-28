import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { CATEGORY_COLORS } from "@/components/categories/category.constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DashboardCategory } from "@/lib/graphql/dashboard/types";
import { ROUTES } from "@/routes";
import { CategoryListItem } from "./CategoryListItem";

type DashboardCategoriesProps = {
  categories: DashboardCategory[];
};

export function DashboardCategories({ categories }: DashboardCategoriesProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between border-b px-6 py-5">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Categorias
        </h2>

        <Link to={ROUTES.private.categories}>
          <Button variant="ghost" size="sm" className="px-2 text-brand-base">
            Gerenciar
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      <div>
        {categories.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Nenhuma categoria encontrada.
          </div>
        ) : (
          categories.map((category) => {
            const categoryTheme =
              CATEGORY_COLORS[category.color] ?? CATEGORY_COLORS.blue;

            return (
              <CategoryListItem
                key={category.title}
                badge={categoryTheme.badge}
                category={category}
              />
            );
          })
        )}
      </div>
    </Card>
  );
}
