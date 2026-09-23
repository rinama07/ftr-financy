import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category } from "@/types";

type CategoryDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  category?: Category;
  onOpenChange: (open: boolean) => void;
};

export function CategoryDialog({
  open,
  mode,
  category,
  onOpenChange,
}: CategoryDialogProps) {
  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? `Editando "${category?.title ?? ""}".`
              : "Preencha os dados da nova categoria."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 text-sm text-gray-500">
          {/* Category form will be implemented here. */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
