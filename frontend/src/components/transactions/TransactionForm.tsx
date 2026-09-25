import clsx from "clsx";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { Category } from "@/types";
import type { Transaction } from "@/types/Transaction";
import { DateField } from "../forms/DateField";
import { TextField } from "../forms/TextField";
import { toDateInputValue } from "./transaction.utils";

export type TransactionFormValues = Pick<
  Transaction,
  "type" | "description" | "date" | "categoryId" | "category"
> & {
  amount?: string;
};

type TransactionFormProps = {
  transaction?: Transaction | null;
  categories: Category[];
  categoriesLoading?: boolean;
  categoriesError?: boolean;
  loading?: boolean;
  errorMessage?: string;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
};

const DEFAULT_VALUES: TransactionFormValues = {
  type: "expense",
  description: "",
  date: toDateInputValue(new Date()),
  amount: "",
  categoryId: "",
};

export function TransactionForm({
  transaction,
  categories,
  categoriesLoading = false,
  categoriesError = false,
  loading = false,
  errorMessage,
  onSubmit,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const categoryOptions = [
    ...(transaction?.category &&
    !categories.some((category) => category.id === transaction.category?.id)
      ? [transaction.category]
      : []),
    ...categories,
  ];

  useEffect(() => {
    if (transaction) {
      reset({
        type: transaction.type,
        description: transaction.description,
        date: toDateInputValue(transaction.date),
        amount: String(transaction.amount),
        categoryId: transaction.categoryId,
      });

      return;
    }

    reset({
      ...DEFAULT_VALUES,
      date: toDateInputValue(new Date()),
      categoryId: categories[0]?.id ?? "",
    });
  }, [transaction, categories, reset]);

  const submit = async (values: TransactionFormValues) => {
    await onSubmit({
      type: values.type,
      description: values.description.trim(),
      date: new Date(`${values.date}T12:00:00`).toISOString(),
      amount: values.amount,
      categoryId: values.categoryId,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Tipo</FieldLabel>

        <div className="grid grid-cols-2 gap-2 rounded-md border p-2">
          <Button
            type="button"
            variant="ghost"
            aria-pressed={selectedType === "expense"}
            className={clsx(
              "h-11 justify-center gap-2",
              selectedType === "expense" &&
                "border border-red-base text-gray-800",
            )}
            onClick={() =>
              setValue("type", "expense", {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          >
            <ArrowDownCircle className="text-red-base" />
            Despesa
          </Button>

          <Button
            type="button"
            variant="ghost"
            aria-pressed={selectedType === "income"}
            className={clsx(
              "h-11 justify-center gap-2",
              selectedType === "income" && "border border-green-base",
            )}
            onClick={() =>
              setValue("type", "income", {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          >
            <ArrowUpCircle className="text-green-base" />
            Receita
          </Button>
        </div>
      </Field>

      <TextField
        aria-invalid={!!errors.description}
        id="transaction-description"
        label="Descrição"
        placeholder="Ex. Almoço no restaurante"
        errorMessage={errors.description?.message}
        {...register("description", {
          required: "A descrição é obrigatória",
          minLength: {
            value: 2,
            message: "A descrição deve ter pelo menos 2 caracteres",
          },
          maxLength: {
            value: 100,
            message: "A descrição deve ter no máximo 100 caracteres",
          },
        })}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField
          aria-invalid={!!errors.date}
          id="transaction-date"
          errorMessage={errors.date?.message}
          label="Data"
          type="date"
          {...register("date", {
            required: "A data é obrigatória",
          })}
        />

        <Field>
          <FieldLabel htmlFor="transaction-amount">Valor</FieldLabel>

          <InputGroup>
            <InputGroupAddon>R$</InputGroupAddon>

            <InputGroupInput
              id="transaction-amount"
              inputMode="decimal"
              placeholder="0,00"
              aria-invalid={!!errors.amount}
              {...register("amount", {
                required: "O valor é obrigatório",
                validate: (value) => {
                  const amount = Number((value ?? "")?.replace(",", "."));

                  if (Number.isNaN(amount)) {
                    return "Informe um valor válido";
                  }

                  if (amount <= 0) {
                    return "O valor deve ser maior que zero";
                  }

                  return true;
                },
              })}
            />
          </InputGroup>

          {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="transaction-category">Categoria</FieldLabel>

        <select
          id="transaction-category"
          className={clsx(
            "h-10 w-full rounded-md border border-input",
            "bg-background px-3 text-sm outline-none",
            "focus:border-ring focus:ring-3 focus:ring-ring/30",
          )}
          disabled={categoriesLoading || categoriesError || loading}
          aria-invalid={!!errors.categoryId}
          {...register("categoryId", {
            required: "A categoria é obrigatória",
          })}
        >
          <option value="">
            {categoriesLoading ? "Carregando..." : "Selecione"}
          </option>

          {categoryOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <FieldError>{errors.categoryId.message}</FieldError>
        )}

        {categoriesError && (
          <p role="alert" className="text-sm text-destructive">
            Não foi possível carregar as categorias.
          </p>
        )}
      </Field>

      {errorMessage && (
        <p role="alert" className="text-sm text-destructive">
          Não foi possível salvar a transação. Tente novamente.
        </p>
      )}

      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </PrimaryButton>
    </form>
  );
}
