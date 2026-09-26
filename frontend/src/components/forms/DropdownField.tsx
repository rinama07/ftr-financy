import type { ComponentProps } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

type DropdownFieldProps<T extends string> = ComponentProps<typeof Select> & {
  description?: string;
  errorMessage?: string;
  label: string;
  options: DropdownOption<T>[];
};

export function DropdownField<T extends string>({
  description,
  errorMessage,
  id,
  label,
  options,
  ...props
}: DropdownFieldProps<T>) {
  return (
    <Field className="w-full h-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Select items={options} {...props}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {description && description.length > 0 && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {errorMessage && errorMessage.length > 0 && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </Field>
  );
}
