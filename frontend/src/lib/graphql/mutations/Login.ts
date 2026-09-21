import { gql, type TypedDocumentNode } from "@apollo/client";

import type { LoginMutationData } from "@/store/auth.types";
import type { LoginInput } from "@/types";

export const LOGIN: TypedDocumentNode<LoginMutationData, { data: LoginInput }> =
  gql`
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        token
        user {
          id
          name
          email
        }
      }
    }
  `;
