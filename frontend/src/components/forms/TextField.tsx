import type { ComponentProps } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export type TextFieldProps = ComponentProps<typeof InputGroupInput> & {
  addon?: React.ReactNode;
  description?: string;
  errorMessage?: string;
  label: string;
};

export function TextField({
  addon,
  className,
  description,
  errorMessage,
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

        <InputGroupInput {...props} id={id} type={type} className={className} />
      </InputGroup>

      {description && <FieldDescription>{description}</FieldDescription>}

      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Field>
  );
}
