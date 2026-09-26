import { useState } from "react";

import { DashboardCategories } from "@/components/dashboard/DashboardCategories";
import { DashboardRecentTransactions } from "@/components/dashboard/DashboardRecentTransactions";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { DashboardSummaryCard } from "@/components/dashboard/DashboardSummaryCard";
import { TransactionDialog } from "@/components/transactions/TransactionDialog";
import type { TransactionFormValues } from "@/components/transactions/TransactionForm";
import { useCategories } from "@/hooks/categories/useCategories";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useTransactionActions } from "@/hooks/transactions/useTransactionActions";
import { formatCurrency } from "@/utils/currency";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

export function DashboardPage() {
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);

  const { data, loading, error, refetch } = useDashboard();
  const { createTransaction, saving, saveError } = useTransactionActions();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const balance = data?.balance ?? 0;
  const monthIncomes = data?.monthIncomes ?? 0;
  const monthExpenses = data?.monthExpenses ?? 0;
  const recentTransactions = data?.recentTransactions ?? [];
  const dashboardCategories = data?.categories ?? [];

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-296 px-4 py-8 sm:px-6 lg:py-12">
        <DashboardSkeleton />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="mx-auto w-full max-w-296 px-4 py-8 sm:px-6 lg:py-12">
        <div className="rounded-xl border bg-white px-6 py-12 text-center">
          <p className="text-sm text-destructive">
            Não foi possível carregar o dashboard.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 text-sm font-medium text-green-base hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  const canCreateTransaction =
    !categoriesLoading && !categoriesError && categories.length > 0;

  const handleTransactionSubmit = async (values: TransactionFormValues) => {
    try {
      const amount = (values.amount ?? "").replace(",", ".").trim();

      const transactionData = {
        type: values.type,
        date: values.date,
        description: values.description.trim(),
        amount: Number(amount),
        categoryId: values.categoryId,
      };

      await createTransaction(transactionData);
      await refetch();

      setTransactionDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl flex flex-col ">
        <section className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <DashboardSummaryCard
            label="Saldo total"
            value={formatCurrency(balance)}
            icon={Wallet}
            iconClassName="text-purple-base"
          />

          <DashboardSummaryCard
            label="Receitas do mês"
            value={formatCurrency(monthIncomes)}
            icon={ArrowUpCircle}
            iconClassName="text-brand-base"
          />

          <DashboardSummaryCard
            label="Despesas do mês"
            value={formatCurrency(monthExpenses)}
            icon={ArrowDownCircle}
            iconClassName="text-red-base"
          />

          <div className="lg:col-span-2">
            <DashboardRecentTransactions
              transactions={recentTransactions}
              createDisabled={!canCreateTransaction}
              onCreateTransaction={() => {
                if (!canCreateTransaction) {
                  return;
                }

                setTransactionDialogOpen(true);
              }}
            />
          </div>

          <DashboardCategories categories={dashboardCategories} />
        </section>
      </div>

      <TransactionDialog
        open={transactionDialogOpen}
        onOpenChange={setTransactionDialogOpen}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoriesError={Boolean(categoriesError)}
        loading={saving}
        errorMessage={saveError?.message}
        onSubmit={handleTransactionSubmit}
      />
    </>
  );
}
