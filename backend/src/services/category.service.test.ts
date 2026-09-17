import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn(),
  findMany: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  groupBy: vi.fn(),
}));

vi.mock("../../prisma/prisma.js", () => ({
  prismaClient: {
    category: {
      findUnique: mocks.findUnique,
      findMany: mocks.findMany,
      create: mocks.create,
      update: mocks.update,
    },
    transaction: {
      groupBy: mocks.groupBy,
    },
  },
}));

import { TransactionType } from "../../generated/prisma/client.js";
import { CategoryService } from "./category.service";

describe("CategoryService", () => {
  const service = new CategoryService();

  beforeEach(() => vi.resetAllMocks());

  describe("getCategory", () => {
    it("should return a category belonging to the user", async () => {
      const category = { id: "cat1", userId: "user-1", title: "Food" };
      mocks.findUnique.mockResolvedValue(category);

      await expect(service.getCategory("cat1", "user-1")).resolves.toEqual(
        category,
      );

      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: { id: "cat1", userId: "user-1" },
      });
    });

    it("should throw when the category does not exist", async () => {
      mocks.findUnique.mockResolvedValue(null);

      await expect(service.getCategory("cat1", "user-1")).rejects.toThrow(
        "Category does not exist!",
      );
    });
  });

  describe("getAllActiveCategories", () => {
    it("should return active categories", async () => {
      const categories = [
        {
          id: "cat1",
          userId: "user-1",
          isActive: true,
          _count: { transactions: 2 },
        },
      ];
      mocks.findMany.mockResolvedValue(categories);

      await expect(service.getAllActiveCategories("user-1")).resolves.toEqual(
        categories,
      );

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: { userId: "user-1", isActive: true },
        include: { _count: { select: { transactions: true } } },
      });
    });

    it("should throw when active categories are not found", async () => {
      mocks.findMany.mockResolvedValue(null);

      await expect(service.getAllActiveCategories("user-1")).rejects.toThrow(
        "Categories not found!",
      );

      expect(mocks.findMany).toHaveBeenCalledWith({
        where: {
          userId: "user-1",
          isActive: true,
        },
        include: {
          _count: {
            select: {
              transactions: true,
            },
          },
        },
      });
    });
  });

  describe("createCategory", () => {
    it("should create a category with the authenticated user id", async () => {
      const input = {
        title: "Food",
        description: "Meals",
        icon_name: "utensils",
        color: "#fff",
      };
      const category = { id: "cat1", userId: "user-1", ...input };
      mocks.create.mockResolvedValue(category);

      await expect(
        service.createCategory(input as any, "user-1"),
      ).resolves.toEqual(category);

      expect(mocks.create).toHaveBeenCalledWith({
        data: { ...input, userId: "user-1" },
      });
    });
  });

  describe("updateCategory", () => {
    it("should update a category scoped to the user", async () => {
      mocks.update.mockResolvedValue({
        id: "cat1",
        title: "New",
        userId: "user-1",
      });

      const data = {
        id: "cat1",
        title: "New",
        description: "Updated",
        icon_name: "star",
        color: "#000",
      };

      await service.updateCategory(data as any, "user-1");

      expect(mocks.update).toHaveBeenCalledWith({
        where: { id: "cat1", userId: "user-1" },
        data: {
          title: "New",
          description: "Updated",
          icon_name: "star",
          color: "#000",
        },
      });
    });
  });

  describe("deleteCategory", () => {
    it("should sof deletes a category by setting isActive to false", async () => {
      mocks.update.mockResolvedValue({
        id: "cat1",
        userId: "user-1",
        isActive: false,
      });

      await service.deleteCategory("cat1", "user-1");

      expect(mocks.update).toHaveBeenCalledWith({
        where: { id: "cat1", userId: "user-1" },
        data: { isActive: false },
      });
    });
  });

  describe("getAllActiveCategoriesWithMetrics", () => {
    it("should calculate category metrics from income and expense transactions", async () => {
      mocks.findMany.mockResolvedValue([
        {
          id: "cat1",
          userId: "user-1",
          isActive: true,
          _count: { transactions: 3 },
        },
        {
          id: "cat2",
          userId: "user-1",
          isActive: true,
          _count: { transactions: 0 },
        },
      ]);

      mocks.groupBy.mockResolvedValue([
        {
          categoryId: "cat1",
          type: TransactionType.income,
          _sum: { amount: 100 },
        },
        {
          categoryId: "cat1",
          type: TransactionType.expense,
          _sum: { amount: 40 },
        },
        {
          categoryId: "cat2",
          type: TransactionType.expense,
          _sum: { amount: 25 },
        },
      ]);

      await expect(
        service.getAllActiveCategoriesWithMetrics("user-1"),
      ).resolves.toEqual([
        expect.objectContaining({
          id: "cat1",
          transactionsCount: 3,
          transactionsBalance: 60,
        }),
        expect.objectContaining({
          id: "cat2",
          transactionsCount: 0,
          transactionsBalance: -25,
        }),
      ]);
    });

    it("should use zero metrics for categories without transactions", async () => {
      mocks.findMany.mockResolvedValue([
        {
          id: "cat1",
          userId: "user-1",
          isActive: true,
          _count: { transactions: 0 },
        },
      ]);
      mocks.groupBy.mockResolvedValue([]);

      const [result] =
        await service.getAllActiveCategoriesWithMetrics("user-1");

      expect(result).toMatchObject({
        id: "cat1",
        transactionsCount: 0,
        transactionsBalance: 0,
      });
    });
  });
});
