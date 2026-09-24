import type { Category } from "./Category";

export type TransactionType = "income" | "expense";

export type TransactionTypeFilter = TransactionType | "all";

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  date: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
  categoryId: string;
  category?: Pick<Category, "id" | "title" | "icon_name" | "color"> | null;
}

export interface GetTransactionsFilterInput {
  description?: string;
  type?: TransactionType;
  categoryId?: string;
  startDate: string;
  endDate: string;
}

export interface CreateTransactionInput {
  description: string;
  type: TransactionType;
  date: string;
  amount: number;
  categoryId: string;
}

export interface UpdateTransactionInput extends CreateTransactionInput {
  id: string;
}
