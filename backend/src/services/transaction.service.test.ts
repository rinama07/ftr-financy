import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn(),
  findMany: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  aggregate: vi.fn(),
}));

vi.mock("../../prisma/prisma.js", () => ({
  prismaClient: {
    transaction: {
      findUnique: mocks.findUnique,
      findMany: mocks.findMany,
      create: mocks.create,
      update: mocks.update,
      delete: mocks.delete,
      aggregate: mocks.aggregate,
    },
  },
}));

import { TransactionType } from "../../generated/prisma/client.js";
import { TransactionService } from "./transaction.service";

describe("TransactionService", () => {
  const service = new TransactionService();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getTransaction", () => {
    it("should return a transaction scoped to the user", async () => {
      const transaction = {
        id: "t1",
        userId: "user-1",
        amount: 100,
      };

      mocks.findUnique.mockResolvedValue(transaction);

      await expect(service.getTransaction("t1", "user-1")).resolves.toEqual(
        transaction,
      );

      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: {
          id: "t1",
          userId: "user-1",
        },
      });
    });

    it("should throw when the transaction does not exist", async () => {
      mocks.findUnique.mockResolvedValue(null);

      await expect(service.getTransaction("t1", "user-1")).rejects.toThrow(
        "Transaction does not exist!",
      );

      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: {
          id: "t1",
          userId: "user-1",
        },
      });
    });
  });

  describe("getTransactions", () => {
    it("should return transactions ordered by date", async () => {
      const transactions = [{ id: "t1" }, { id: "t2" }];

      mocks.findMany.mockResolvedValue(transactions);

      await expect(service.getTransactions("user-1")).resolves.toEqual(
        transactions,
      );

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: { userId: "user-1" },
        orderBy: {
          date: "desc",
        },
      });
    });

    it("should apply a limit when one is provided", async () => {
      mocks.findMany.mockResolvedValue([]);

      await service.getTransactions("user-1", 5);

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: { userId: "user-1" },
        orderBy: {
          date: "desc",
        },
        take: 5,
      });
    });

    it("should throw when transactions are not found", async () => {
      mocks.findMany.mockResolvedValue(null);

      await expect(service.getTransactions("user-1")).rejects.toThrow(
        "Transactions not found!",
      );

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: { userId: "user-1" },
        orderBy: {
          date: "desc",
        },
      });
    });
  });

  describe("createTransaction", () => {
    it("should create a transaction for the authenticated user", async () => {
      const data = {
        type: TransactionType.expense,
        description: "Lunch",
        date: new Date("2026-09-10T12:00:00Z"),
        amount: 50,
        categoryId: "cat1",
      };

      const transaction = {
        id: "t1",
        userId: "user-1",
        ...data,
      };

      mocks.create.mockResolvedValue(transaction);

      await expect(
        service.createTransaction(data as any, "user-1"),
      ).resolves.toEqual(transaction);

      expect(mocks.create).toHaveBeenCalledWith({
        data: {
          type: data.type,
          description: data.description,
          date: data.date,
          amount: data.amount,
          categoryId: data.categoryId,
          userId: "user-1",
        },
      });
    });
  });

  describe("updateTransaction", () => {
    it("should update a transaction scoped to the user", async () => {
      const data = {
        id: "t1",
        type: TransactionType.income,
        description: "Salary",
        date: new Date("2026-09-01T12:00:00Z"),
        amount: 5000,
        categoryId: "cat1",
      };

      const transaction = {
        ...data,
        userId: "user-1",
      };

      mocks.update.mockResolvedValue(transaction);

      await expect(
        service.updateTransaction(data as any, "user-1"),
      ).resolves.toEqual(transaction);

      expect(mocks.update).toHaveBeenCalledWith({
        where: {
          id: "t1",
          userId: "user-1",
        },
        data: {
          type: data.type,
          description: data.description,
          date: data.date,
          amount: data.amount,
          categoryId: data.categoryId,
        },
      });
    });
  });

  describe("deleteTransaction", () => {
    it("should delete a transaction scoped to the user", async () => {
      const transaction = {
        id: "t1",
        userId: "user-1",
      };

      mocks.delete.mockResolvedValue(transaction);

      await expect(service.deleteTransaction("t1", "user-1")).resolves.toEqual(
        transaction,
      );

      expect(mocks.delete).toHaveBeenCalledWith({
        where: {
          id: "t1",
          userId: "user-1",
        },
      });
    });
  });

  describe("getTransactionByFilter", () => {
    it("should filter transactions by description, type, category and date range", async () => {
      mocks.findMany.mockResolvedValue([]);

      const startDate = new Date("2026-09-01T00:00:00Z");
      const endDate = new Date("2026-09-30T23:59:59Z");

      await expect(
        service.getTransactionByFilter(
          {
            description: "food",
            type: TransactionType.expense,
            categoryId: "cat1",
            startDate,
            endDate,
          } as any,
          "user-1",
        ),
      ).resolves.toEqual([]);

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: {
          userId: "user-1",
          description: {
            contains: "food",
          },
          type: TransactionType.expense,
          categoryId: "cat1",
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
    });

    it("should return transactions when no optional filters are provided", async () => {
      const transactions = [
        {
          id: "t1",
          userId: "user-1",
        },
      ];

      mocks.findMany.mockResolvedValue(transactions);

      await expect(
        service.getTransactionByFilter({}, "user-1"),
      ).resolves.toEqual(transactions);

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: {
          userId: "user-1",
        },
      });
    });

    it("should throw when filtered transactions are not found", async () => {
      mocks.findMany.mockResolvedValue(null);

      await expect(
        service.getTransactionByFilter(
          {
            type: TransactionType.expense,
          } as any,
          "user-1",
        ),
      ).rejects.toThrow("Transactions not found!");

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: {
          userId: "user-1",
          type: TransactionType.expense,
        },
      });
    });
  });

  describe("getTotalFinancialSummary", () => {
    it("should return zero when there is no income or expense", async () => {
      mocks.aggregate
        .mockResolvedValueOnce({
          _sum: {
            amount: null,
          },
        })
        .mockResolvedValueOnce({
          _sum: {
            amount: null,
          },
        });

      await expect(service.getTotalFinancialSummary("user-1")).resolves.toEqual(
        {
          balance: 0,
          expense: 0,
          income: 0,
        },
      );
    });

    it("should return total income and expense", async () => {
      mocks.aggregate
        .mockResolvedValueOnce({
          _sum: {
            amount: 1000,
          },
        })
        .mockResolvedValueOnce({
          _sum: {
            amount: 250,
          },
        });

      await expect(service.getTotalFinancialSummary("user-1")).resolves.toEqual(
        {
          balance: 750,
          expense: 250,
          income: 1000,
        },
      );

      expect(mocks.aggregate).toHaveBeenNthCalledWith(1, {
        where: {
          userId: "user-1",
          type: TransactionType.income,
        },
        _sum: {
          amount: true,
        },
      });

      expect(mocks.aggregate).toHaveBeenNthCalledWith(2, {
        where: {
          userId: "user-1",
          type: TransactionType.expense,
        },
        _sum: {
          amount: true,
        },
      });
    });
  });

  describe("getCurrentMonthFinancialSummary", () => {
    it("should return the current month income and expense", async () => {
      const incomeSpy = vi
        .spyOn(service, "getMonthIncomeAmount")
        .mockResolvedValue(1000);

      const expenseSpy = vi
        .spyOn(service, "getMonthExpenseAmount")
        .mockResolvedValue(300);

      await expect(
        service.getCurrentMonthFinancialSummary("user-1"),
      ).resolves.toEqual({
        balance: 700,
        expense: 300,
        income: 1000,
      });

      expect(incomeSpy).toHaveBeenCalledOnce();
      expect(expenseSpy).toHaveBeenCalledOnce();
      expect(incomeSpy).toHaveBeenCalledWith(
        "user-1",
        expect.objectContaining({
          year: expect.any(Number),
          month: expect.any(Number),
        }),
      );
      expect(expenseSpy).toHaveBeenCalledWith(
        "user-1",
        expect.objectContaining({
          year: expect.any(Number),
          month: expect.any(Number),
        }),
      );
    });
  });

  describe("getMonthIncomeAmount", () => {
    it("should return the monthly income amount for a given month", async () => {
      mocks.aggregate.mockResolvedValue({
        _sum: {
          amount: 250,
        },
      });

      await expect(
        service.getMonthIncomeAmount("user-1", {
          year: 2026,
          month: 8,
        }),
      ).resolves.toBe(250);

      expect(mocks.aggregate).toHaveBeenCalledWith({
        where: {
          userId: "user-1",
          type: TransactionType.income,
          date: {
            gte: new Date(2026, 8, 1),
            lte: new Date(2026, 9, 0),
          },
        },
        _sum: {
          amount: true,
        },
      });
    });

    it("should return zero when there is no monthly income", async () => {
      mocks.aggregate.mockResolvedValue({
        _sum: {
          amount: null,
        },
      });

      await expect(
        service.getMonthIncomeAmount("user-1", {
          year: 2026,
          month: 8,
        }),
      ).resolves.toBe(0);
    });
  });

  describe("getMonthExpenseAmount", () => {
    it("should return the monthly expense amount for a given month", async () => {
      mocks.aggregate.mockResolvedValue({
        _sum: {
          amount: 300,
        },
      });

      await expect(
        service.getMonthExpenseAmount("user-1", {
          year: 2026,
          month: 8,
        }),
      ).resolves.toBe(300);

      expect(mocks.aggregate).toHaveBeenCalledWith({
        where: {
          userId: "user-1",
          type: TransactionType.expense,
          date: {
            gte: new Date(2026, 8, 1),
            lte: new Date(2026, 9, 0),
          },
        },
        _sum: {
          amount: true,
        },
      });
    });

    it("should return zero when there is no monthly expense", async () => {
      mocks.aggregate.mockResolvedValue({
        _sum: {
          amount: null,
        },
      });

      await expect(
        service.getMonthExpenseAmount("user-1", {
          year: 2026,
          month: 8,
        }),
      ).resolves.toBe(0);
    });
  });
});
