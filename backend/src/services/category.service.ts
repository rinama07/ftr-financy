import type { Category } from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async findCategory(id: string, userId: string): Promise<Category> {
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

  async findAllActiveCategoriesWithCount(userId: string): Promise<Category[]> {
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
      totalTransactions: category._count.transactions,
    }));
  }

  async createCategory(data: CreateCategoryInput, userId: string) {
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

  async updateCategory(data: UpdateCategoryInput, userId: string) {
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

  async deleteCategory(categoryId: string, userId: string) {
    return await prismaClient.category.update({
      where: {
        id: categoryId,
        userId,
      },
      data: { isActive: false },
    });
  }
}
