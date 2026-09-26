import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { FieldDescription } from "@/components/ui/field";
import type { Category } from "@/types";
import type { Transaction, TransactionType } from "@/types/Transaction";
import { CurrencyField } from "../forms/CurrencyField";
import { DateField } from "../forms/DateField";
import { DropdownField } from "../forms/DropdownField";
import { RadioField, type RadioOption } from "../forms/RadioField";
import { TextField } from "../forms/TextField";
import { getCategoryOptions, toDateInputValue } from "./transaction.utils";

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

const TRANSACTION_TYPE_OPTIONS = [
  {
    value: "expense",
    label: "Despesa",
    icon: <ArrowDownCircle className="text-red-base" />,
    selectedClassName: "border border-red-base text-gray-800",
  },
  {
    value: "income",
    label: "Receita",
    icon: <ArrowUpCircle className="text-green-base" />,
    selectedClassName: "border border-green-base",
  },
] satisfies RadioOption<TransactionType>[];

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
      <RadioField
        id="transaction-type"
        label="Tipo"
        value={selectedType}
        options={TRANSACTION_TYPE_OPTIONS}
        onChange={(type) =>
          setValue("type", type, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      />

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

        <CurrencyField
          aria-invalid={!!errors.amount}
          id="transaction-amount"
          label="Valor"
          errorMessage={errors.amount?.message}
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
      </div>

      <div className="flex flex-col gap-1">
        <Controller
          name="categoryId"
          control={control}
          rules={{
            required: "A categoria é obrigatória",
          }}
          render={({ field, fieldState }) => (
            <DropdownField
              id="transaction-category"
              label="Categoria"
              aria-invalid={!!fieldState.error}
              disabled={categoriesLoading || categoriesError || loading}
              errorMessage={fieldState.error?.message}
              onValueChange={field.onChange}
              options={getCategoryOptions(categoryOptions)}
              value={field.value}
            />
          )}
        />

        {categoriesError && (
          <FieldDescription className="text-sm text-destructive">
            Não foi possível carregar as categorias.
          </FieldDescription>
        )}
      </div>

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
