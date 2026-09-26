import { describe, expect, it, vi } from "vitest";
import { DashboardResolver } from "./dashboard.resolver";

describe("DashboardResolver", () => {
  it("should combine financial summaries, recent transactions and categories", async () => {
    const resolver = new DashboardResolver();
    const transactionService = (resolver as any).transactionService;
    const categoryService = (resolver as any).categoryService;

    vi.spyOn(transactionService, "getTotalFinancialSummary").mockResolvedValue({
      balance: 3500,
      income: 5000,
      expense: 1500,
    });

    vi.spyOn(
      transactionService,
      "getCurrentMonthFinancialSummary",
    ).mockResolvedValue({
      balance: 1500,
      expense: 500,
      income: 2000,
    });

    vi.spyOn(transactionService, "getTransactions").mockResolvedValue([
      { id: "t1" },
    ]);

    vi.spyOn(
      categoryService,
      "getAllActiveCategoriesWithMetrics",
    ).mockResolvedValue([{ id: "cat1" }]);

    await expect(
      resolver.getDashboardData({ id: "user-1" } as any),
    ).resolves.toEqual({
      balance: 3500,
      monthIncomes: 2000,
      monthExpenses: 500,
      recentTransactions: [{ id: "t1" }],
      categories: [{ id: "cat1" }],
    });

    expect(transactionService.getTransactions).toHaveBeenCalledWith(
      "user-1",
      5,
    );
    expect(
      categoryService.getAllActiveCategoriesWithMetrics,
    ).toHaveBeenCalledWith("user-1");
  });
});
