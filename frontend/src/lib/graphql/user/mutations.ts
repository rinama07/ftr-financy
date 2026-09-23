import { gql, type TypedDocumentNode } from "@apollo/client";

import type { UpdateUserInput } from "@/types";
import type { UpdateUserMutationData } from "./types";

export const UPDATE_USER: TypedDocumentNode<
  UpdateUserMutationData,
  { data: UpdateUserInput }
> = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      email
      name
    }
  }
`;
