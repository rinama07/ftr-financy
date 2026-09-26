import type { Category } from "@/types/Category";
import type { Transaction } from "@/types/Transaction";

export type DashboardTransactionCategory = Pick<
  Category,
  "title" | "icon_name" | "color"
>;

export type DashboardRecentTransaction = Pick<
  Transaction,
  "type" | "description" | "date" | "amount"
> & {
  category: DashboardTransactionCategory;
};

export type DashboardCategory = Pick<
  Category,
  "title" | "color" | "transactionsCount" | "transactionsBalance"
>;

export type DashboardData = {
  balance: number;
  monthIncomes: number;
  monthExpenses: number;
  recentTransactions: DashboardRecentTransaction[];
  categories: DashboardCategory[];
};

export interface GetDashboardDataResponse {
  getDashboardData: DashboardData;
}
