import { gql, type TypedDocumentNode } from "@apollo/client";

import type { LoginInput, RegisterInput } from "@/types";
import type { LoginMutationData, RegisterMutationData } from "./types";

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
