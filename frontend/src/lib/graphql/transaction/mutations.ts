import { gql, type TypedDocumentNode } from "@apollo/client";

import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "@/types/Transaction";
import type {
  CreateTransactionResponse,
  DeleteTransactionResponse,
  DeleteTransactionVariables,
  UpdateTransactionResponse,
} from "./types";

export const CREATE_TRANSACTION: TypedDocumentNode<
  CreateTransactionResponse,
  { data: CreateTransactionInput }
> = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      type
      description
      date
      amount
      createdAt
      updatedAt
      category {
        id
        title
        color
        icon_name
      }
    }
  }
`;

export const UPDATE_TRANSACTION: TypedDocumentNode<
  UpdateTransactionResponse,
  { data: UpdateTransactionInput }
> = gql`
  mutation UpdateTransaction($data: UpdateTransactionInput!) {
    updateTransaction(data: $data) {
      id
      type
      description
      date
      amount
      createdAt
      updatedAt
      category {
        id
        title
        color
        icon_name
      }
    }
  }
`;

export const DELETE_TRANSACTION: TypedDocumentNode<
  DeleteTransactionResponse,
  DeleteTransactionVariables
> = gql`
  mutation DeleteTransaction($deleteTransactionId: String!) {
    deleteTransaction(id: $deleteTransactionId) {
      id
    }
  }
`;
