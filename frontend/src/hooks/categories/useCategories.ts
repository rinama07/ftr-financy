import { useQuery } from "@apollo/client/react";

import { GET_CATEGORIES } from "@/lib/graphql/category/queries";

export function useCategories() {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);

  return {
    refetch,

    categories: data?.getAllActiveCategories ?? [],

    loading,
    error,
  };
}
