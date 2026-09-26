import { useQuery } from "@apollo/client/react";

import { GET_DASHBOARD_DATA } from "@/lib/graphql/dashboard/queries";

export function useDashboard() {
  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD_DATA);

  return {
    refetch,

    data: data?.getDashboardData,

    loading,
    error,
  };
}
