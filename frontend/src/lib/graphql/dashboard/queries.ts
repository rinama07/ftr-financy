import { gql, type TypedDocumentNode } from "@apollo/client";

import type { GetDashboardDataResponse } from "./types";

export const GET_DASHBOARD_DATA: TypedDocumentNode<GetDashboardDataResponse> = gql`
  query Dashboard {
    getDashboardData {
      balance
      monthIncomes
      monthExpenses
      recentTransactions {
        type
        description
        date
        amount
        category {
          title
          icon_name
          color
        }
      }
      categories {
        title
        color
        transactionsCount
        transactionsBalance
      }
    }
  }
`;
