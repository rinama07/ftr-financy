import type { Category } from "@/types";

export function getCategoryStats(baseCategories: Category[]) {
  const totalCategories = baseCategories.length;
  const categories = baseCategories.map((category) => ({
    ...category,
    transactionsCount: category.transactionsCount ?? 0,
  }));

  const totalTransactions = categories.reduce(
    (total, category) => total + category.transactionsCount,
    0,
  );

  const mostUsedCategory = totalCategories
    ? categories.reduce((current, category) =>
        category.transactionsCount > current.transactionsCount
          ? category
          : current,
      )
    : null;

  return {
    totalCategories,
    totalTransactions,
    mostUsedCategory,
  };
}
