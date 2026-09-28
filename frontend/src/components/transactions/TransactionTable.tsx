import clsx from "clsx";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";

import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
} from "@/components/categories/category.constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Transaction } from "@/types/Transaction";
import {
  formatTransactionAmount,
  formatTransactionDate,
} from "./transaction.utils";

type TransactionTableProps = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  const tableHeaderClassName =
    "px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500";

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-230 w-full">
          <thead>
            <tr className="border-b bg-background">
              <th className={clsx(tableHeaderClassName, "text-left")}>
                Descrição
              </th>

              <th className={clsx(tableHeaderClassName, "text-left")}>Data</th>

              <th className={clsx(tableHeaderClassName, "text-left")}>
                Categoria
              </th>

              <th className={clsx(tableHeaderClassName, "text-left")}>Tipo</th>

              <th className={clsx(tableHeaderClassName, "text-right")}>
                Valor
              </th>

              <th className={clsx(tableHeaderClassName, "text-right")}>
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const category = transaction.category;

              const Icon = category?.icon_name
                ? (CATEGORY_ICONS[category.icon_name] ?? Tag)
                : Tag;

              const theme = category?.color
                ? (CATEGORY_COLORS[category.color] ?? CATEGORY_COLORS.blue)
                : CATEGORY_COLORS.blue;

              const isIncome = transaction.type === "income";

              return (
                <tr key={transaction.id} className="border-b last:border-b-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={clsx(
                          "flex size-10 shrink-0 items-center justify-center rounded-lg",
                          theme.icon,
                        )}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span className="font-medium text-gray-900">
                        {transaction.description}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {formatTransactionDate(transaction.date)}
                  </td>

                  <td className="px-6 py-4">
                    {category ? (
                      <span
                        className={clsx(
                          "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                          theme.badge,
                        )}
                      >
                        {category.title}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Sem categoria
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={clsx(
                        "flex items-center gap-2 text-sm",
                        isIncome ? "text-green-600" : "text-red-600",
                      )}
                    >
                      {isIncome ? (
                        <ArrowUpCircle className="size-4" />
                      ) : (
                        <ArrowDownCircle className="size-4" />
                      )}

                      {isIncome ? "Entrada" : "Saída"}
                    </div>
                  </td>

                  <td
                    className={clsx(
                      "whitespace-nowrap px-6 py-4 text-right text-sm font-semibold",
                      isIncome ? "text-gray-900" : "text-gray-900",
                    )}
                  >
                    {formatTransactionAmount(
                      transaction.amount ?? 0,
                      transaction.type,
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Excluir ${transaction.description}`}
                        className="text-destructive hover:text-destructive"
                        onClick={() => onDelete(transaction)}
                      >
                        <Trash2 />
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Editar ${transaction.description}`}
                        onClick={() => onEdit(transaction)}
                      >
                        <Pencil />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
