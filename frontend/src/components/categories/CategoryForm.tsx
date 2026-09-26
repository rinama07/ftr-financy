import clsx from "clsx";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import type { Category } from "@/types";
import { SelectField } from "../forms/SelectField";
import { TextField } from "../forms/TextField";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "./category.constants";

export type CategoryFormValues = Pick<
  Category,
  "title" | "description" | "icon_name" | "color"
>;

type CategoryFormProps = {
  category?: Category | null;
  loading?: boolean;
  errorMessage?: string;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
};

const DEFAULT_FORM_VALUES: CategoryFormValues = {
  title: "",
  description: "",
  icon_name: "briefcase",
  color: "green",
};

export function CategoryForm({
  category,
  loading = false,
  errorMessage,
  onSubmit,
}: CategoryFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const selectedIcon = useWatch({
    control,
    name: "icon_name",
  });

  const selectedColor = useWatch({
    control,
    name: "color",
  });

  useEffect(() => {
    if (category) {
      reset({
        title: category.title,
        description: category.description ?? "",
        icon_name: category.icon_name,
        color: category.color,
      });

      return;
    }

    reset(DEFAULT_FORM_VALUES);
  }, [category, reset]);

  const submit = async (values: CategoryFormValues) => {
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <TextField
        id="category-title"
        label="Título"
        placeholder="Ex. Alimentação"
        aria-invalid={!!errors.title}
        errorMessage={errors.title?.message}
        {...register("title", {
          required: "O título é obrigatório",
          minLength: {
            value: 2,
            message: "O título deve ter pelo menos 2 caracteres",
          },
          maxLength: {
            value: 50,
            message: "O título deve ter no máximo 50 caracteres",
          },
        })}
      />

      <TextField
        label="Descrição"
        id="category-description"
        placeholder="Descrição da categoria"
        errorMessage={errors.description?.message}
        {...register("description", {
          maxLength: {
            value: 150,
            message: "A descrição deve ter no máximo 150 caracteres",
          },
        })}
      />

      <SelectField
        label="Ícone"
        options={Object.keys(CATEGORY_ICONS)}
        value={selectedIcon}
        onChange={(option) =>
          setValue("icon_name", option, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        containerClassName="grid grid-cols-8 gap-2"
        renderOption={(option) => {
          const Icon = CATEGORY_ICONS[option];

          return <Icon />;
        }}
      />

      <SelectField
        label="Cor"
        options={Object.keys(CATEGORY_COLORS)}
        value={selectedColor}
        onChange={(option) =>
          setValue("color", option, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        containerClassName="flex flex-wrap gap-2"
        buttonClassName="h-7 flex-1 p-1"
        renderOption={(option) => {
          const color = CATEGORY_COLORS[option];

          return (
            <span
              className={clsx("h-full w-full rounded-sm", color.selection)}
            />
          );
        }}
      />

      {errorMessage && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </PrimaryButton>
    </form>
  );
}
