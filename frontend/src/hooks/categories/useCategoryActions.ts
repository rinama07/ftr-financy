import { useMutation } from "@apollo/client/react";

import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/category/mutations";
import { GET_CATEGORIES } from "@/lib/graphql/category/queries";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/types";

export function useCategoryActions() {
  const [
    createCategoryMutation,
    { loading: creating, error: createError, reset: resetCreate },
  ] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
    awaitRefetchQueries: true,
  });

  const [
    updateCategoryMutation,
    { loading: updating, error: updateError, reset: resetUpdate },
  ] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
    awaitRefetchQueries: true,
  });

  const [
    deleteCategoryMutation,
    { loading: deleting, error: deleteError, reset: resetDelete },
  ] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
    awaitRefetchQueries: true,
  });

  const createCategory = async (data: CreateCategoryInput) => {
    await createCategoryMutation({
      variables: {
        data,
      },
    });
  };

  const updateCategory = async (data: UpdateCategoryInput) => {
    await updateCategoryMutation({
      variables: {
        data,
      },
    });
  };

  const deleteCategory = async (id: string) => {
    await deleteCategoryMutation({
      variables: {
        deleteCategoryId: id,
      },
    });
  };

  const resetErrors = () => {
    resetCreate();
    resetUpdate();
    resetDelete();
  };

  return {
    deleteError,
    deleting,
    saveError: createError ?? updateError,
    saving: creating || updating,
    createCategory,
    deleteCategory,
    resetErrors,
    updateCategory,
  };
}
