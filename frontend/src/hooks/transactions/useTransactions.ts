import { useQuery } from "@apollo/client/react";

import { GET_TRANSACTIONS_BY_FILTER } from "@/lib/graphql/transaction/queries";
import type { GetTransactionsVariables } from "@/lib/graphql/transaction/types";

export function useTransactions({
  filter,
  page,
  pageSize,
}: GetTransactionsVariables) {
  const { data, loading, error, refetch } = useQuery(
    GET_TRANSACTIONS_BY_FILTER,
    {
      variables: {
        filter,
        page,
        pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  return {
    refetch,

    data: data?.getTransactionsByFilter ?? {
      page: null,
      pageSize: null,
      total: 0,
      totalPages: 0,
      transactions: [],
    },

    loading,
    error,
  };
}
