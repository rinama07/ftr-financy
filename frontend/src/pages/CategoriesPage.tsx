import { useMutation, useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CategoryDialog } from "@/components/categories/CategoryDialog";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { CategoryGridSkeleton } from "@/components/categories/CategoryGridSkeleton";
import { CategoryHighlights } from "@/components/categories/CategoryHighlights";
import { DeleteCategoryDialog } from "@/components/categories/DeleteCategoryDialog";
import { Card } from "@/components/ui/card";
import { DELETE_CATEGORY } from "@/lib/graphql/category/mutations";
import { GET_CATEGORIES } from "@/lib/graphql/category/queries";
import type { Category } from "@/types";

type CategoryDialogState = {
  mode: "create" | "edit";
  category?: Category;
} | null;

export function CategoriesPage() {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);

  const [deleteCategory, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_CATEGORY);

  const [categoryDialog, setCategoryDialog] =
    useState<CategoryDialogState>(null);

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const categories = data?.getAllActiveCategories ?? [];

  const handleCreate = () => {
    setCategoryDialog({
      mode: "create",
    });
  };

  const handleEdit = (category: Category) => {
    setCategoryDialog({
      mode: "edit",
      category,
    });
  };

  const handleDeleteRequest = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) {
      return;
    }

    try {
      await deleteCategory({
        variables: {
          data: {
            deleteCategoryId: categoryToDelete.id,
          },
        },
      });

      await refetch();

      setCategoryToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>

            <p className="mt-1 text-gray-600">
              Organize suas transações por categorias
            </p>
          </div>

          <PrimaryButton
            type="button"
            size="sm"
            className="w-full sm:w-auto"
            onClick={handleCreate}
          >
            <Plus />
            <span>Nova categoria</span>
          </PrimaryButton>
        </header>

        {error ? (
          <Card className="flex flex-col items-center gap-4 p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Não foi possível carregar as categorias
            </h2>

            <p className="text-sm text-gray-600">
              Tente novamente em alguns instantes.
            </p>

            <PrimaryButton type="button" size="sm" onClick={() => refetch()}>
              Tentar novamente
            </PrimaryButton>
          </Card>
        ) : loading ? (
          <CategoryGridSkeleton />
        ) : categories.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Nenhuma categoria cadastrada
            </h2>

            <p className="max-w-md text-sm text-gray-600">
              Crie sua primeira categoria para começar a organizar suas
              transações.
            </p>

            <PrimaryButton type="button" size="sm" onClick={handleCreate}>
              <Plus />
              Nova categoria
            </PrimaryButton>
          </Card>
        ) : (
          <>
            <CategoryHighlights categories={categories} />

            <CategoryGrid
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />
          </>
        )}
      </div>

      <CategoryDialog
        open={categoryDialog !== null}
        mode={categoryDialog?.mode ?? "create"}
        category={categoryDialog?.category ?? null}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryDialog(null);
          }
        }}
      />

      <DeleteCategoryDialog
        open={categoryToDelete !== null}
        category={categoryToDelete}
        loading={deleting}
        error={deleteError}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setCategoryToDelete(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
