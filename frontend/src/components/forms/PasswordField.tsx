import clsx from "clsx";
import { Eye, EyeClosed, Lock } from "lucide-react";
import type { ComponentProps } from "react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type PasswordFieldProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  "type"
> & {
  label: string;
  description?: string;
};

export function PasswordField({
  id,
  label,
  className,
  description,
  ...props
}: PasswordFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((value) => !value);

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupAddon>
          <Lock />
        </InputGroupAddon>

        <InputGroupInput
          {...props}
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={clsx("mx-1", className)}
        />

        <InputGroupAddon align="inline-end" className="text-gray-700">
          <Button
            variant="ghost"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        </InputGroupAddon>
      </InputGroup>

      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
