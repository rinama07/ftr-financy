import { Mail } from "lucide-react";
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

type EmailFieldProps = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  description?: string;
  errorMessage?: string;
  label?: string;
};

export function EmailField({
  className,
  description,
  errorMessage,
  id,
  label,
  placeholder,
  ...props
}: EmailFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label ?? "E-mail"}</FieldLabel>

      <InputGroup>
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>

        <InputGroupInput
          {...props}
          autoComplete="email"
          className={className}
          id={id}
          placeholder={placeholder ?? "mail@exemplo.com"}
          type="email"
        />
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
