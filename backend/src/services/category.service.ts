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

  async findCategoryList(userId: string): Promise<Category[]> {
    const categories = await prismaClient.category.findMany({
      where: {
        userId,
      },
    });

    if (!categories || categories.length === 0) {
      throw new Error("Categories not found!");
    }

    return categories;
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
    return await prismaClient.category.delete({
      where: {
        id: categoryId,
        userId,
      },
    });
  }
}
