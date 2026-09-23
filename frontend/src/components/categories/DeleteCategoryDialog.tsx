import { AlertCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import type { Category } from "@/types";

type DeleteCategoryDialogProps = {
  category?: Category;
  open: boolean;
  loading: boolean;
  error: Error | undefined;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function DeleteCategoryDialog({
  category,
  open,
  loading,
  error,
  onOpenChange,
  onConfirm,
}: DeleteCategoryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="size-5 text-destructive" />
            Excluir categoria?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Essa ação irá desativar a categoria{" "}
            <strong>{category?.title}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            Não foi possível excluir a categoria. Tente novamente.
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
          >
            {loading && <Spinner />}
            {loading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
