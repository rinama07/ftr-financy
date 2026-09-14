import { gql, type TypedDocumentNode } from "@apollo/client";

import type { RegisterMutationData } from "@/store/auth.types";
import type { RegisterInput } from "@/types";

export const REGISTER: TypedDocumentNode<
  RegisterMutationData,
  { data: RegisterInput }
> = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
