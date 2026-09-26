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

        <InputGroupInput {...props} id={id} type={type} />
      </InputGroup>

      {description && description.length > 0 && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {errorMessage && errorMessage.length > 0 && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </Field>
  );
}
