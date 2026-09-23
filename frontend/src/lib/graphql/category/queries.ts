import { gql, type TypedDocumentNode } from "@apollo/client";

import type { GetActiveCategoriesResponse } from "./types";

export const GET_CATEGORIES: TypedDocumentNode<GetActiveCategoriesResponse> = gql`
  query GetActiveCategories {
    getAllActiveCategories {
      id
      title
      description
      icon_name
      color
    }
  }
`;
