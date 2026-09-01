import { prismaClient } from "../../prisma/prisma.js";
import type { CreateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {
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
}
