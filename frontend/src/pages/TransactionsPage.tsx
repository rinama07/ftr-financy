import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { DeleteTransactionDialog } from "@/components/transactions/DeleteTransactionDialog";
import {
  buildTransactionFilter,
  getCurrentPeriod,
  type TransactionFilterState,
} from "@/components/transactions/transaction.utils";
import { TransactionDialog } from "@/components/transactions/TransactionDialog";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import type { TransactionFormValues } from "@/components/transactions/TransactionForm";
import { TransactionPagination } from "@/components/transactions/TransactionPagination";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionTableSkeleton } from "@/components/transactions/TransactionTableSkeleton";
import { Card } from "@/components/ui/card";
import { useTransactionActions } from "@/hooks/transactions/useTransactionActions";
import { GET_CATEGORIES } from "@/lib/graphql/category/queries";
import { GET_TRANSACTIONS } from "@/lib/graphql/transaction/queries";
import type { Transaction } from "@/types/Transaction";

const PAGE_SIZE = 10;

export function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilterState>({
    description: "",
    type: "all",
    categoryId: "all",
    period: getCurrentPeriod(),
  });

  const [page, setPage] = useState(1);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const transactionFilter = useMemo(
    () => buildTransactionFilter(filters),
    [filters],
  );

  const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: {
      filter: transactionFilter,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: categoryData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES);

  const {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    saving,
    saveError,
    deleting,
    deleteError,
    resetErrors,
  } = useTransactionActions();

  const transactions = data?.getTransactionsByFilter ?? [];

  console.info({ transactions });

  const categories = categoryData?.getAllActiveCategories ?? [];

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

  const currentPage = totalPages === 0 ? 1 : Math.min(page, totalPages);

  const visibleTransactions = transactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleFilterChange = useCallback(
    (changes: Partial<TransactionFilterState>) => {
      setFilters((current) => ({
        ...current,
        ...changes,
      }));

      setPage(1);
    },
    [],
  );

  const handleCreate = () => {
    resetErrors();

    setSelectedTransaction(null);
    setTransactionDialogOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    resetErrors();

    setSelectedTransaction(transaction);
    setTransactionDialogOpen(true);
  };

  const handleDeleteRequest = (transaction: Transaction) => {
    resetErrors();

    setSelectedTransaction(transaction);
    setDeleteDialogOpen(true);
  };

  const handleTransactionDialogChange = (open: boolean) => {
    if (saving) {
      return;
    }

    setTransactionDialogOpen(open);

    if (!open) {
      setSelectedTransaction(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (deleting) {
      return;
    }

    setDeleteDialogOpen(open);

    if (!open) {
      setSelectedTransaction(null);
    }
  };

  const handleTransactionSubmit = async (values: TransactionFormValues) => {
    console.log({ values });

    try {
      const amount = (values.amount ?? "").replace(",", ".").trim();

      if (selectedTransaction) {
        await updateTransaction({
          id: selectedTransaction.id,
          type: values.type,
          date: values.date,
          description: values.description,
          amount: Number(amount),
          categoryId: values.categoryId,
        });
      } else {
        await createTransaction({
          type: values.type,
          date: values.date,
          description: values.description,
          amount: Number(amount),
          categoryId: values.categoryId,
        });
      }

      await refetch();

      setTransactionDialogOpen(false);
      setSelectedTransaction(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTransaction) {
      return;
    }

    try {
      await deleteTransaction(selectedTransaction.id);

      await refetch();

      setDeleteDialogOpen(false);
      setSelectedTransaction(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Transações</h1>

            <p className="mt-1 text-gray-600">
              Gerencie todas as suas transações financeiras
            </p>
          </div>

          <PrimaryButton
            type="button"
            size="sm"
            className="w-auto"
            onClick={handleCreate}
          >
            <Plus />
            <span>Nova transação</span>
          </PrimaryButton>
        </header>

        <TransactionFilters
          filters={filters}
          categories={categories}
          onChange={handleFilterChange}
        />

        {error ? (
          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Não foi possível carregar as transações
            </h2>

            <p className="text-sm text-gray-600">
              Tente novamente em alguns instantes.
            </p>

            <PrimaryButton type="button" size="sm" onClick={() => refetch()}>
              Tentar novamente
            </PrimaryButton>
          </Card>
        ) : loading ? (
          <TransactionTableSkeleton />
        ) : transactions.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Nenhuma transação encontrada
            </h2>

            <p className="max-w-md text-sm text-gray-600">
              Ajuste os filtros ou crie uma nova transação.
            </p>

            <PrimaryButton type="button" size="sm" onClick={handleCreate}>
              <Plus />
              Nova transação
            </PrimaryButton>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <TransactionTable
              transactions={visibleTransactions}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />

            <TransactionPagination
              page={currentPage}
              pageSize={PAGE_SIZE}
              totalItems={transactions.length}
              onPageChange={setPage}
            />
          </Card>
        )}
      </div>

      <TransactionDialog
        open={transactionDialogOpen}
        transaction={selectedTransaction}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoriesError={Boolean(categoriesError)}
        loading={saving}
        errorMessage={saveError?.message}
        onOpenChange={handleTransactionDialogChange}
        onSubmit={handleTransactionSubmit}
      />

      <DeleteTransactionDialog
        open={deleteDialogOpen}
        transaction={selectedTransaction}
        loading={deleting}
        errorMessage={deleteError?.message}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
