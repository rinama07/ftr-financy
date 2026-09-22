import { cn } from "cn";
import { Mail } from "lucide-react";
import type { ComponentProps } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type EmailFieldProps = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  label: string;
  description?: string;
};

export function EmailField({
  className,
  id,
  label,
  ...props
}: EmailFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>

        <InputGroupInput
          {...props}
          autoComplete="email"
          className={cn("mx-1", className)}
          id={id}
          type="email"
        />
      </InputGroup>
    </Field>
  );
}
