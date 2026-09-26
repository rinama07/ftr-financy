import { Eye, EyeClosed, Lock } from "lucide-react";
import type { ComponentProps } from "react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
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

type PasswordFieldProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  "type"
> & {
  description?: string;
  errorMessage?: string;
  label?: string;
};

export function PasswordField({
  className,
  description,
  errorMessage,
  id,
  label,
  placeholder,
  ...props
}: PasswordFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((value) => !value);

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>{label ?? "Senha"}</FieldLabel>

      <InputGroup>
        <InputGroupAddon>
          <Lock />
        </InputGroupAddon>

        <InputGroupInput
          {...props}
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={className}
          placeholder={placeholder ?? "Digite sua senha"}
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

      {description && description.length > 0 && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {errorMessage && errorMessage.length > 0 && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </Field>
  );
}
