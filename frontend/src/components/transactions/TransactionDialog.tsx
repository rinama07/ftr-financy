import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category } from "@/types";
import type { Transaction } from "@/types/Transaction";
import { TransactionForm, type TransactionFormValues } from "./TransactionForm";

type TransactionDialogProps = {
  open: boolean;
  transaction?: Transaction | null;
  categories: Category[];
  categoriesLoading?: boolean;
  categoriesError?: boolean;
  loading?: boolean;
  errorMessage?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
};

export function TransactionDialog({
  open,
  transaction,
  categories,
  categoriesLoading = false,
  categoriesError = false,
  loading = false,
  errorMessage,
  onOpenChange,
  onSubmit,
}: TransactionDialogProps) {
  const isEdit = transaction != null;

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
          <DialogTitle>
            {isEdit ? "Editar transação" : "Nova transação"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? `Editando "${transaction.description}"`
              : "Registre sua despesa ou receita"}
          </DialogDescription>
        </DialogHeader>

        <TransactionForm
          transaction={transaction}
          categories={categories}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
          loading={loading}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
