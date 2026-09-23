import { gql, type TypedDocumentNode } from "@apollo/client";

import type { LoginInput, RegisterInput } from "@/types";
import type { LoginMutationResponse, RegisterMutationResponse } from "./types";

export const LOGIN: TypedDocumentNode<
  LoginMutationResponse,
  { data: LoginInput }
> = gql`
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
  RegisterMutationResponse,
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
