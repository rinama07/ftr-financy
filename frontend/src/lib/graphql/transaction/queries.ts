import { gql, type TypedDocumentNode } from "@apollo/client";

import type { GetTransactionsFilterInput } from "@/types/Transaction";
import type { GetTransactionsResponse } from "./types";

export const GET_TRANSACTIONS: TypedDocumentNode<GetTransactionsResponse> = gql`
  query GetTransactions {
    getAllTransactions {
      id
      description
      date
      type
      amount
      category {
        id
        title
        color
        icon_name
      }
    }
  }
`;

export const GET_TRANSACTIONS_BY_FILTER: TypedDocumentNode<
  GetTransactionsResponse,
  { filter: GetTransactionsFilterInput }
> = gql`
  query GetTransactionsByFilter($filter: TransactionFilterInput!) {
    getTransactionsByFilter(filter: $filter) {
      id
      description
      date
      type
      amount
      category {
        id
        title
        color
        icon_name
      }
    }
  }
`;
