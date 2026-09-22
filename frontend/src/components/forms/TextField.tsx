import clsx from "clsx";
import type { ComponentProps } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type TextFieldProps = ComponentProps<typeof InputGroupInput> & {
  addon: React.ReactNode;
  label: string;
  description?: string;
};

export function TextField({
  addon,
  className,
  id,
  label,
  type,
  ...props
}: TextFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <InputGroup>
        {addon && <InputGroupAddon>{addon}</InputGroupAddon>}

        <InputGroupInput
          {...props}
          id={id}
          type={type}
          className={clsx("mx-1", className)}
        />
      </InputGroup>
    </Field>
  );
}
