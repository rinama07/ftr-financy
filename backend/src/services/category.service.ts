import type { Category } from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async findCategory(id: string, authorId: string): Promise<Category> {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        authorId,
      },
    });

    if (!category) {
      throw new Error("Category does not exist!");
    }

    return category;
  }

  async findCategoryList(authorId: string): Promise<Category[]> {
    const categories = await prismaClient.category.findMany({
      where: {
        authorId,
      },
    });

    if (!categories || categories.length === 0) {
      throw new Error("Categories not found!");
    }

    return categories;
  }

  async createCategory(data: CreateCategoryInput, authorId: string) {
    return await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon_name: data.icon_name,
        color: data.color,
        authorId,
      },
    });
  }

  async updateCategory(data: UpdateCategoryInput, authorId: string) {
    return await prismaClient.category.update({
      where: {
        id: data.id,
        authorId,
      },
      data: {
        title: data.title,
        description: data.description,
        icon_name: data.icon_name,
        color: data.color,
      },
    });
  }

  async deleteCategory(categoryId: string, authorId: string) {
    return await prismaClient.category.delete({
      where: {
        id: categoryId,
        authorId,
      },
    });
  }
}
