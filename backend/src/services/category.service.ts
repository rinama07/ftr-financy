import {
  TransactionType,
  type Category,
} from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async getCategory(id: string, userId: string): Promise<Category> {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new Error("Category does not exist!");
    }

    return category;
  }

  async getAllActiveCategoriesWithMetrics(userId: string): Promise<Category[]> {
    const [categories, transactions] = await Promise.all([
      await prismaClient.category.findMany({
        where: {
          userId,
          isActive: true,
        },
        include: {
          _count: {
            select: { transactions: true },
          },
        },
      }),
      prismaClient.transaction.groupBy({
        where: { userId },
        by: ["categoryId", "type"],
        _sum: {
          amount: true,
        },
      }),
    ]);

    const metricsMap = new Map<string, { income: number; expense: number }>();

    for (const transaction of transactions) {
      if (!transaction.categoryId) continue;

      const amount = Number(transaction._sum.amount || 0);
      const current = metricsMap.get(transaction.categoryId) || {
        income: 0,
        expense: 0,
      };

      if (transaction.type === TransactionType.income) {
        current.income += amount;
      } else if (transaction.type === TransactionType.expense) {
        current.expense += amount;
      }

      metricsMap.set(transaction.categoryId, current);
    }

    return categories.map((category) => {
      const metrics = metricsMap.get(category.id) || { income: 0, expense: 0 };

      return {
        ...category,
        transactionsCount: category._count.transactions,
        transactionsBalance: metrics.income - metrics.expense,
      };
    });
  }

  async getAllActiveCategories(userId: string): Promise<Category[]> {
    const categories = await prismaClient.category.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!categories) {
      throw new Error("Categories not found!");
    }

    return categories.map((category) => ({
      ...category,
      transactionsCount: category._count.transactions,
    }));
  }

  async createCategory(
    data: CreateCategoryInput,
    userId: string,
  ): Promise<Category> {
    const existingCategory = await prismaClient.category.findFirst({
      where: {
        userId,
        title: data.title,
      },
    });

    if (existingCategory) {
      throw new Error("Category title already in use");
    }

    return await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon_name: data.icon_name,
        color: data.color,
        userId,
      },
    });
  }

  async updateCategory(
    data: UpdateCategoryInput,
    userId: string,
  ): Promise<Category> {
    return await prismaClient.category.update({
      where: {
        id: data.id,
        userId,
      },
      data: {
        title: data.title,
        description: data.description,
        icon_name: data.icon_name,
        color: data.color,
      },
    });
  }

  async deleteCategory(categoryId: string, userId: string): Promise<Category> {
    return await prismaClient.category.update({
      where: {
        id: categoryId,
        userId,
      },
      data: { isActive: false },
    });
  }
}
