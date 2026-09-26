import { useQuery } from "@apollo/client/react";
import { useState } from "react";

import { CreateButton } from "@/components/buttons/CreateButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CategoryDialog } from "@/components/categories/CategoryDialog";
import type { CategoryFormValues } from "@/components/categories/CategoryForm";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { CategoryGridSkeleton } from "@/components/categories/CategoryGridSkeleton";
import { CategoryHighlights } from "@/components/categories/CategoryHighlights";
import { DeleteCategoryDialog } from "@/components/categories/DeleteCategoryDialog";
import { Card } from "@/components/ui/card";
import { useCategoryActions } from "@/hooks/categories/useCategoryActions";
import { GET_CATEGORIES } from "@/lib/graphql/category/queries";
import type { Category, UpdateCategoryInput } from "@/types";

export function CategoriesPage() {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);

  const {
    createCategory,
    updateCategory,
    deleteCategory,
    saving,
    saveError,
    deleting,
    deleteError,
    resetErrors,
  } = useCategoryActions();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const categories = data?.getAllActiveCategories ?? [];

  const handleCreate = () => {
    resetErrors();
    setSelectedCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    resetErrors();
    setSelectedCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleDeleteRequest = (category: Category) => {
    resetErrors();
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleCategoryDialogChange = (open: boolean) => {
    setCategoryDialogOpen(open);

    if (!open) {
      setSelectedCategory(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (deleting) {
      return;
    }

    setDeleteDialogOpen(open);

    if (!open) {
      setSelectedCategory(null);
    }
  };

  const handleCategorySubmit = async (values: CategoryFormValues) => {
    if (selectedCategory) {
      const updateData: UpdateCategoryInput = {
        id: selectedCategory.id,
        title: values.title,
        description: values.description ?? "",
        icon_name: values.icon_name,
        color: values.color,
      };

      await updateCategory(updateData);
    } else {
      await createCategory({
        title: values.title,
        description: values.description ?? "",
        icon_name: values.icon_name,
        color: values.color,
      });
    }

    setCategoryDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) {
      return;
    }

    try {
      await deleteCategory(selectedCategory.id);

      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (e) {
      console.error(e);
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

          <CreateButton onClick={handleCreate} label="Nova categoria" />
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
        open={categoryDialogOpen}
        category={selectedCategory}
        loading={saving}
        errorMessage={saveError?.message}
        onOpenChange={handleCategoryDialogChange}
        onSubmit={handleCategorySubmit}
      />

      <DeleteCategoryDialog
        open={deleteDialogOpen}
        category={selectedCategory}
        loading={deleting}
        errorMessage={deleteError?.message}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
