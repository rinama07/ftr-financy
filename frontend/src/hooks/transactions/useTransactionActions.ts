import { useMutation } from "@apollo/client/react";

import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/transaction/mutations";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "@/types/Transaction";

export function useTransactionActions() {
  const [
    createTransactionMutation,
    { loading: creating, error: createError, reset: resetCreate },
  ] = useMutation(CREATE_TRANSACTION);

  const [
    updateTransactionMutation,
    { loading: updating, error: updateError, reset: resetUpdate },
  ] = useMutation(UPDATE_TRANSACTION);

  const [
    deleteTransactionMutation,
    { loading: deleting, error: deleteError, reset: resetDelete },
  ] = useMutation(DELETE_TRANSACTION);

  const createTransaction = async (data: CreateTransactionInput) => {
    await createTransactionMutation({
      variables: { data },
    });
  };

  const updateTransaction = async (data: UpdateTransactionInput) => {
    await updateTransactionMutation({
      variables: { data },
    });
  };

  const deleteTransaction = async (id: string) => {
    await deleteTransactionMutation({
      variables: {
        deleteTransactionId: id,
      },
    });
  };

  const resetErrors = () => {
    resetCreate();
    resetUpdate();
    resetDelete();
  };

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,

    saving: creating || updating,
    saveError: createError ?? updateError,

    deleting,
    deleteError,

    resetErrors,
  };
}
