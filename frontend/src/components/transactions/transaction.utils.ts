import type {
  GetTransactionsFilterInput,
  TransactionTypeFilter,
} from "@/types/Transaction";

export interface TransactionFilterState {
  description: string;
  type: TransactionTypeFilter;
  categoryId: string;
  period: string;
}

export function getCurrentPeriod(): string {
  const now = new Date();

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getMonthOptions(count = 24) {
  const now = new Date();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();

    const monthName = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    }).format(date);

    const label =
      `${monthName.charAt(0).toUpperCase()}` +
      `${monthName.slice(1)} / ${year}`;

    return {
      value: `${year}-${month}`,
      label,
    };
  });
}

export function getMonthRange(period: string) {
  const [year, month] = period.split("-").map(Number);

  const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);

  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}

export function buildTransactionFilter(
  filters: TransactionFilterState,
): GetTransactionsFilterInput {
  const range = getMonthRange(filters.period);

  return {
    ...range,

    ...(filters.description.trim()
      ? {
          description: filters.description.trim(),
        }
      : {}),

    ...(filters.type !== "all"
      ? {
          type: filters.type,
        }
      : {}),

    ...(filters.categoryId !== "all"
      ? {
          categoryId: filters.categoryId,
        }
      : {}),
  };
}

export function formatTransactionDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(date));
}

export function formatTransactionAmount(
  amount: number,
  type: "income" | "expense",
): string {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Math.abs(amount));

  return type === "income" ? `+ ${formatted}` : `- ${formatted}`;
}

export function toDateInputValue(date: string | Date): string {
  const value = date instanceof Date ? date : new Date(date);

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
