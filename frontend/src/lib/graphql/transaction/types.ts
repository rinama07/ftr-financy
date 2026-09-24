import type {
  CreateTransactionInput,
  GetTransactionsFilterInput,
  Transaction,
  UpdateTransactionInput,
} from "@/types/Transaction";

type TransactionMutationData = Pick<
  Transaction,
  | "id"
  | "type"
  | "description"
  | "date"
  | "amount"
  | "createdAt"
  | "updatedAt"
  | "category"
>;

export interface CreateTransactionResponse {
  createTransaction: TransactionMutationData;
}

export interface UpdateTransactionResponse {
  updateTransaction: TransactionMutationData;
}

export interface DeleteTransactionResponse {
  deleteTransaction: Pick<Transaction, "id">;
}

export type GetTransactionsVariables = {
  filter: GetTransactionsFilterInput;
};

export type CreateTransactionVariables = {
  data: CreateTransactionInput;
};

export type UpdateTransactionVariables = {
  data: UpdateTransactionInput;
};

export type DeleteTransactionVariables = {
  deleteTransactionId: string;
};

export interface GetTransactionsResponse {
  getTransactionsByFilter: Transaction[];
}
