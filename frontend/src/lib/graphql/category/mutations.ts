import { gql, type TypedDocumentNode } from "@apollo/client";

import type { CreateCategoryInput, UpdateCategoryInput } from "@/types";
import type {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  DeleteCategoryVariables,
  UpdateCategoryResponse,
} from "./types";

export const CREATE_CATEGORY: TypedDocumentNode<
  CreateCategoryResponse,
  { data: CreateCategoryInput }
> = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      icon_name
      color
      title
      description
    }
  }
`;

export const UPDATE_CATEGORY: TypedDocumentNode<
  UpdateCategoryResponse,
  { data: UpdateCategoryInput }
> = gql`
  mutation UpdateCategory($data: UpdateCategoryInput!) {
    updateCategory(data: $data) {
      id
      icon_name
      color
      title
      description
    }
  }
`;

export const DELETE_CATEGORY: TypedDocumentNode<
  DeleteCategoryResponse,
  DeleteCategoryVariables
> = gql`
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId) {
      id
    }
  }
`;
