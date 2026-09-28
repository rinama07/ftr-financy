import { describe, expect, it } from "vitest";

import type { Category } from "@/types";
import { getCategoryStats } from "./category.utils";

describe("getCategoryStats", () => {
  it("should return zero totals and no most used category when there are no categories", () => {
    expect(getCategoryStats([])).toEqual({
      totalCategories: 0,
      totalTransactions: 0,
      mostUsedCategory: null,
    });
  });

  it("should return the total number of categories", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
      },
      {
        id: "category-3",
        title: "Lazer",
        icon_name: "entertainment",
        color: "purple",
      },
    ] satisfies Category[];

    expect(getCategoryStats(categories).totalCategories).toBe(3);
  });

  it("should return zero transactions when categories have no transaction counts", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
      },
    ] satisfies Category[];

    expect(getCategoryStats(categories).totalTransactions).toBe(0);
  });

  it("should treat missing transaction counts as zero", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
        transactionsCount: 5,
      },
    ] satisfies Category[];

    const result = getCategoryStats(categories);

    expect(result.totalTransactions).toBe(5);
    expect(result.mostUsedCategory?.id).toBe("category-2");
  });

  it("should calculate the total number of transactions", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
        transactionsCount: 10,
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
        transactionsCount: 5,
      },
      {
        id: "category-3",
        title: "Lazer",
        icon_name: "entertainment",
        color: "purple",
        transactionsCount: 3,
      },
    ] satisfies Category[];

    expect(getCategoryStats(categories).totalTransactions).toBe(18);
  });

  it("should return the only category as the most used category", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
        transactionsCount: 7,
      },
    ] satisfies Category[];

    const result = getCategoryStats(categories);

    expect(result.mostUsedCategory).toEqual({
      ...categories[0],
      transactionsCount: 7,
    });
  });

  it("should return the category with the highest transaction count as the most used category", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
        transactionsCount: 4,
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
        transactionsCount: 12,
      },
      {
        id: "category-3",
        title: "Lazer",
        icon_name: "entertainment",
        color: "purple",
        transactionsCount: 7,
      },
    ] satisfies Category[];

    const result = getCategoryStats(categories);

    expect(result.mostUsedCategory).toEqual({
      ...categories[1],
      transactionsCount: 12,
    });
  });

  it("should use the first category when multiple categories have the same highest transaction count", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
        transactionsCount: 10,
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
        transactionsCount: 10,
      },
      {
        id: "category-3",
        title: "Lazer",
        icon_name: "entertainment",
        color: "purple",
        transactionsCount: 3,
      },
    ] satisfies Category[];

    const result = getCategoryStats(categories);

    expect(result.mostUsedCategory).toEqual({
      ...categories[0],
      transactionsCount: 10,
    });
  });

  it("should return a normalized category with zero transactions when all counts are missing", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
      },
    ] satisfies Category[];

    const result = getCategoryStats(categories);

    expect(result.mostUsedCategory).toEqual({
      ...categories[0],
      transactionsCount: 0,
    });
  });

  it("should return the correct statistics when categories have mixed transaction counts", () => {
    const categories = [
      {
        id: "category-1",
        title: "Alimentação",
        icon_name: "food",
        color: "green",
        transactionsCount: 0,
      },
      {
        id: "category-2",
        title: "Transporte",
        icon_name: "car",
        color: "blue",
      },
      {
        id: "category-3",
        title: "Lazer",
        icon_name: "entertainment",
        color: "purple",
        transactionsCount: 8,
      },
    ] satisfies Category[];

    expect(getCategoryStats(categories)).toEqual({
      totalCategories: 3,
      totalTransactions: 8,
      mostUsedCategory: {
        ...categories[2],
        transactionsCount: 8,
      },
    });
  });
});
