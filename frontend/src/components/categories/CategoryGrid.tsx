import type { Category } from "@/types";
import { CategoryCard } from "./CategoryCard";

type CategoryGridProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoryGrid({
  categories,
  onEdit,
  onDelete,
}: CategoryGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryCard
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
