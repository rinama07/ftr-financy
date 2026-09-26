import { ArrowDownCircle, ArrowRight, ArrowUpCircle, Plus } from "lucide-react";
import { Link } from "react-router";

import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_ICON,
} from "@/components/categories/category.constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DashboardRecentTransaction } from "@/lib/graphql/dashboard/types";
import { ROUTES } from "@/routes";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";

type DashboardRecentTransactionsProps = {
  transactions: DashboardRecentTransaction[];
  onCreateTransaction: () => void;
  createDisabled?: boolean;
};

function getCategoryIcon(iconName: string) {
  return CATEGORY_ICONS[iconName] ?? DEFAULT_CATEGORY_ICON;
}

function getCategoryTheme(color: string) {
  return CATEGORY_COLORS[color] ?? CATEGORY_COLORS.blue;
}

export function DashboardRecentTransactions({
  transactions,
  onCreateTransaction,
  createDisabled = false,
}: DashboardRecentTransactionsProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Transações recentes
        </h2>

        <Link to={ROUTES.private.transactions}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 px-2 text-brand-base"
          >
            Ver todas
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      <div>
        {transactions.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Nenhuma transação encontrada.
          </div>
        ) : (
          transactions.map((transaction) => {
            const Icon = getCategoryIcon(transaction.category.icon_name);
            const categoryTheme = getCategoryTheme(transaction.category.color);

            const isIncome = transaction.type === "income";
            const amount = Number(transaction.amount);

            return (
              <div
                key={`${transaction.description}-${transaction.date}-${transaction.amount}`}
                className="flex flex-wrap items-center gap-3 border-b px-6 py-4 last:border-b-0 sm:flex-nowrap"
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${categoryTheme.badge}`}
                >
                  <Icon className={`size-5 ${categoryTheme.icon}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900">
                    {transaction.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${categoryTheme.badge}`}
                >
                  {transaction.category.title}
                </span>

                <div className="flex min-w-30 items-center justify-end gap-2">
                  <span className="whitespace-nowrap font-semibold text-gray-900">
                    {isIncome ? "+" : "-"} {formatCurrency(amount)}
                  </span>

                  {isIncome ? (
                    <ArrowUpCircle className="size-4 shrink-0 text-brand-base" />
                  ) : (
                    <ArrowDownCircle className="size-4 shrink-0 text-red-base" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        disabled={createDisabled}
        onClick={onCreateTransaction}
        className="h-14 w-full gap-2 rounded-none border-t text-brand-base"
      >
        <Plus className="size-4" />
        Nova transação
      </Button>
    </Card>
  );
}
