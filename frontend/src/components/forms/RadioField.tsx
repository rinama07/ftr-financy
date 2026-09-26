import clsx from "clsx";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

export interface RadioOption<T extends string> {
  className?: string;
  icon?: ReactNode;
  label: string;
  selectedClassName?: string;
  value: T;
}

type RadioFieldProps<T extends string> = {
  className?: string;
  disabled?: boolean;
  id: string;
  label: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function RadioField<T extends string>({
  className,
  disabled = false,
  id,
  label,
  options,
  value,
  onChange,
}: RadioFieldProps<T>) {
  return (
    <Field className={className}>
      <FieldLabel id={`${id}-label`}>{label}</FieldLabel>

      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        className="grid grid-cols-2 gap-2 rounded-md border p-2"
      >
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              variant="ghost"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              className={clsx(
                "h-11 justify-center gap-2",
                selected && option.selectedClassName,
                option.className,
              )}
              onClick={() => onChange(option.value)}
            >
              {option.icon}
              {option.label}
            </Button>
          );
        })}
      </div>
    </Field>
  );
}
