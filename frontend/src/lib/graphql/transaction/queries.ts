import { gql, type TypedDocumentNode } from "@apollo/client";

import type {
  GetTransactionsResponse,
  GetTransactionsVariables,
} from "./types";

export const GET_TRANSACTIONS_BY_FILTER: TypedDocumentNode<
  GetTransactionsResponse,
  GetTransactionsVariables
> = gql`
  query GetTransactionsByFilter(
    $filter: TransactionFilterInput!
    $page: Int!
    $pageSize: Int!
  ) {
    getTransactionsByFilter(filter: $filter, page: $page, pageSize: $pageSize) {
      transactions {
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
      total
      page
      pageSize
      totalPages
    }
  }
`;
