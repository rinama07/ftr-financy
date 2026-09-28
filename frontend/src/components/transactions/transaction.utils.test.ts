import { afterEach, describe, expect, it, vi } from "vitest";

import type { Category } from "@/types";

import {
  buildTransactionFilter,
  formatTransactionAmount,
  formatTransactionDate,
  getCategoryFilterOptions,
  getCategoryOptions,
  getCurrentPeriod,
  getMonthFilterOptions,
  getMonthRange,
  getTypeFilterOptions,
  toDateInputValue,
} from "./transaction.utils";

describe("transaction.utils", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getCategoryOptions", () => {
    it("should return an empty array when there are no categories", () => {
      expect(getCategoryOptions([])).toEqual([]);
    });

    it("should map categories to dropdown options", () => {
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

      expect(getCategoryOptions(categories)).toEqual([
        {
          label: "Alimentação",
          value: "category-1",
        },
        {
          label: "Transporte",
          value: "category-2",
        },
      ]);
    });
  });

  describe("getCurrentPeriod", () => {
    it("should return the current year and month in YYYY-MM format", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 8, 16, 12, 0, 0));

      expect(getCurrentPeriod()).toBe("2026-09");
    });

    it("should pad the month with a leading zero", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 0, 16, 12, 0, 0));

      expect(getCurrentPeriod()).toBe("2026-01");
    });
  });

  describe("getTypeFilterOptions", () => {
    it("should return all transaction type filter options", () => {
      expect(getTypeFilterOptions()).toEqual([
        {
          label: "Todos",
          value: "all",
        },
        {
          label: "Saídas",
          value: "expense",
        },
        {
          label: "Entradas",
          value: "income",
        },
      ]);
    });
  });

  describe("getCategoryFilterOptions", () => {
    it("should return only the all option when there are no categories", () => {
      expect(getCategoryFilterOptions([])).toEqual([
        {
          label: "Todas",
          value: "all",
        },
      ]);
    });

    it("should include all categories after the all option", () => {
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

      expect(getCategoryFilterOptions(categories)).toEqual([
        {
          label: "Todas",
          value: "all",
        },
        {
          label: "Alimentação",
          value: "category-1",
        },
        {
          label: "Transporte",
          value: "category-2",
        },
      ]);
    });
  });

  describe("getMonthFilterOptions", () => {
    it("should return 24 months by default", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 8, 16, 12, 0, 0));

      expect(getMonthFilterOptions()).toHaveLength(24);
    });

    it("should return the requested number of months", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 8, 16, 12, 0, 0));

      expect(getMonthFilterOptions(3)).toHaveLength(3);
    });

    it("should return the current month as the first option", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 8, 16, 12, 0, 0));

      expect(getMonthFilterOptions(1)).toEqual([
        {
          value: "2026-09",
          label: "Setembro / 2026",
        },
      ]);
    });

    it("should return months in descending chronological order", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 8, 16, 12, 0, 0));

      expect(getMonthFilterOptions(3)).toEqual([
        {
          value: "2026-09",
          label: "Setembro / 2026",
        },
        {
          value: "2026-08",
          label: "Agosto / 2026",
        },
        {
          value: "2026-07",
          label: "Julho / 2026",
        },
      ]);
    });

    it("should handle the transition to the previous year", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 0, 16, 12, 0, 0));

      expect(getMonthFilterOptions(2)).toEqual([
        {
          value: "2026-01",
          label: "Janeiro / 2026",
        },
        {
          value: "2025-12",
          label: "Dezembro / 2025",
        },
      ]);
    });

    it("should return an empty array when count is zero", () => {
      expect(getMonthFilterOptions(0)).toEqual([]);
    });
  });

  describe("getMonthRange", () => {
    it("should return the first and last moment of the selected month", () => {
      const result = getMonthRange("2026-09");

      expect(result.startDate).toBe(
        new Date(2026, 8, 1, 0, 0, 0, 0).toISOString(),
      );

      expect(result.endDate).toBe(
        new Date(2026, 9, 0, 23, 59, 59, 999).toISOString(),
      );
    });

    it("should correctly handle February in a leap year", () => {
      const result = getMonthRange("2028-02");

      expect(result.startDate).toBe(
        new Date(2028, 1, 1, 0, 0, 0, 0).toISOString(),
      );

      expect(result.endDate).toBe(
        new Date(2028, 2, 0, 23, 59, 59, 999).toISOString(),
      );
    });

    it("should correctly handle December", () => {
      const result = getMonthRange("2026-12");

      expect(result.startDate).toBe(
        new Date(2026, 11, 1, 0, 0, 0, 0).toISOString(),
      );

      expect(result.endDate).toBe(
        new Date(2027, 0, 0, 23, 59, 59, 999).toISOString(),
      );
    });
  });

  describe("buildTransactionFilter", () => {
    const baseFilters = {
      description: "",
      type: "all",
      categoryId: "all",
      period: "2026-09",
    } as const;

    it("should return only the month range when no optional filters are selected", () => {
      expect(buildTransactionFilter(baseFilters)).toEqual(
        getMonthRange("2026-09"),
      );
    });

    it("should trim and include the description filter", () => {
      expect(
        buildTransactionFilter({
          ...baseFilters,
          description: "  Mercado  ",
        }),
      ).toEqual({
        ...getMonthRange("2026-09"),
        description: "Mercado",
      });
    });

    it("should not include an empty description filter", () => {
      expect(
        buildTransactionFilter({
          ...baseFilters,
          description: "   ",
        }),
      ).toEqual(getMonthRange("2026-09"));
    });

    it("should include the transaction type filter", () => {
      expect(
        buildTransactionFilter({
          ...baseFilters,
          type: "expense",
        }),
      ).toEqual({
        ...getMonthRange("2026-09"),
        type: "expense",
      });
    });

    it("should not include the transaction type when all is selected", () => {
      expect(
        buildTransactionFilter({
          ...baseFilters,
          type: "all",
        }),
      ).not.toHaveProperty("type");
    });

    it("should include the category filter", () => {
      expect(
        buildTransactionFilter({
          ...baseFilters,
          categoryId: "category-1",
        }),
      ).toEqual({
        ...getMonthRange("2026-09"),
        categoryId: "category-1",
      });
    });

    it("should not include the category when all is selected", () => {
      expect(
        buildTransactionFilter({
          ...baseFilters,
          categoryId: "all",
        }),
      ).not.toHaveProperty("categoryId");
    });

    it("should include all selected filters", () => {
      expect(
        buildTransactionFilter({
          description: "  Supermercado  ",
          type: "expense",
          categoryId: "category-1",
          period: "2026-09",
        }),
      ).toEqual({
        ...getMonthRange("2026-09"),
        description: "Supermercado",
        type: "expense",
        categoryId: "category-1",
      });
    });
  });

  describe("formatTransactionDate", () => {
    it("should format the transaction date as DD/MM/YY", () => {
      const date = new Date(2026, 8, 15, 12, 0, 0).toISOString();

      expect(formatTransactionDate(date)).toBe("15/09/26");
    });
  });

  describe("formatTransactionAmount", () => {
    it("should format an income amount with a positive sign", () => {
      expect(formatTransactionAmount(1234.5, "income")).toBe(
        "+ R$\u00a01.234,50",
      );
    });

    it("should format an expense amount with a negative sign", () => {
      expect(formatTransactionAmount(1234.5, "expense")).toBe(
        "- R$\u00a01.234,50",
      );
    });

    it("should use the absolute value for negative income amounts", () => {
      expect(formatTransactionAmount(-1234.5, "income")).toBe(
        "+ R$\u00a01.234,50",
      );
    });

    it("should use the absolute value for negative expense amounts", () => {
      expect(formatTransactionAmount(-1234.5, "expense")).toBe(
        "- R$\u00a01.234,50",
      );
    });

    it("should format zero correctly", () => {
      expect(formatTransactionAmount(0, "income")).toBe("+ R$\u00a00,00");

      expect(formatTransactionAmount(0, "expense")).toBe("- R$\u00a00,00");
    });
  });

  describe("toDateInputValue", () => {
    it("should convert a Date object to YYYY-MM-DD", () => {
      const date = new Date(2026, 8, 15, 12, 0, 0);

      expect(toDateInputValue(date)).toBe("2026-09-15");
    });

    it("should convert a date string to YYYY-MM-DD", () => {
      const date = new Date(2026, 8, 15, 12, 0, 0).toISOString();

      expect(toDateInputValue(date)).toBe("2026-09-15");
    });

    it("should pad month and day with leading zeros", () => {
      const date = new Date(2026, 0, 5, 12, 0, 0);

      expect(toDateInputValue(date)).toBe("2026-01-05");
    });
  });
});
