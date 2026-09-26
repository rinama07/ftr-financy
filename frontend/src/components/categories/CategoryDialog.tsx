import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Category } from "@/types";
import { CategoryForm, type CategoryFormValues } from "./CategoryForm";

type CategoryDialogProps = {
  open: boolean;
  category?: Category | null;
  loading?: boolean;
  errorMessage?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
};

export function CategoryDialog({
  open,
  category,
  loading = false,
  errorMessage,
  onOpenChange,
  onSubmit,
}: CategoryDialogProps) {
  const isEdit = category != null;
  const title = isEdit ? "Editar categoria" : "Nova categoria";
  const description = isEdit
    ? `Editando "${category.title}"`
    : "Organize suas transações com categorias";

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="pr-8">
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <CategoryForm
          category={category}
          loading={loading}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
