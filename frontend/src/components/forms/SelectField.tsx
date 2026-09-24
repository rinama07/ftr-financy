import clsx from "clsx";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

type SelectFieldProps<T extends string> = {
  buttonClassName?: string;
  containerClassName?: string;
  label: string;
  options: readonly T[];
  value: T;
  getOptionLabel?: (option: T) => string;
  onChange: (value: T) => void;
  renderOption: (option: T, selected: boolean) => ReactNode;
};

export function SelectField<T extends string>({
  buttonClassName,
  containerClassName,
  label,
  options,
  value,
  getOptionLabel = (option) => option,
  onChange,
  renderOption,
}: SelectFieldProps<T>) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      <div className={containerClassName}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <Button
              key={option}
              type="button"
              variant="outline"
              size="icon"
              aria-label={`Selecionar ${getOptionLabel(option)}`}
              aria-pressed={selected}
              className={clsx(buttonClassName, {
                "border-primary text-primary ring-1 ring-primary": selected,
                "border-gray-200 text-gray-500": !selected,
              })}
              onClick={() => onChange(option)}
            >
              {renderOption(option, selected)}
            </Button>
          );
        })}
      </div>
    </Field>
  );
}
