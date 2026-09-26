import type { Category } from "@/types";

export type CategoryMutationData = Pick<
  Category,
  | "id"
  | "title"
  | "description"
  | "icon_name"
  | "color"
  | "transactionsCount"
  | "transactionsBalance"
>;

export interface CreateCategoryResponse {
  createCategory: CategoryMutationData;
}

export interface UpdateCategoryResponse {
  updateCategory: CategoryMutationData;
}

export interface DeleteCategoryResponse {
  deleteCategory: Pick<Category, "id">;
}

export interface DeleteCategoryVariables {
  deleteCategoryId: string;
}

export interface GetActiveCategoriesResponse {
  getAllActiveCategories: Category[];
}
