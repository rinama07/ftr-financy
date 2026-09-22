import type { ComponentProps } from "react";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type TextFieldProps = ComponentProps<typeof InputGroupInput> & {
  addon: React.ReactNode;
  description?: string;
  label: string;
};

export function TextField({
  addon,
  className,
  description,
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
    </Field>
  );
}
