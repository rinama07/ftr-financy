import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { UnauthenticatedPageLayout } from "@/PageLayout";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // TODO: Create login flow
    alert("SUBMIT");
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <UnauthenticatedPageLayout>
      <Card className="w-full max-w-md p-8 my-8">
        <form onSubmit={handleSubmit}>
          <FieldSet className="p-0 m-0">
            <FieldLegend className="w-full text-center text-gray-800">
              Fazer login
            </FieldLegend>

            <FieldDescription className="w-full text-center text-gray-600">
              Entre na sua conta para continuar
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="mail@exemplo.com"
                    className="mx-1"
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="mx-1"
                  />
                  <InputGroupAddon className="text-gray-700" align="inline-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleToggleShowPassword}
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>

            <div className="flex flex-row">
              <Field orientation="horizontal">
                <Checkbox id="remember-user" />
                <FieldLabel htmlFor="remember-user">Lembrar-me</FieldLabel>
              </Field>

              <Button
                type="button"
                variant="link"
                className="text-brand-base m-0 p-0"
                onClick={handleResetPassword}
              >
                <span>Recuperar senha</span>
              </Button>
            </div>
          </FieldSet>

          <Button type="submit" variant="default" className="w-full mt-5">
            <span>Entrar</span>
          </Button>
        </form>

        <FieldSeparator className="my-2">
          <span className="text-gray-500">ou</span>
        </FieldSeparator>

        <span className="text-center text-gray-600">
          Ainda não tem uma conta?
        </span>

        <Link to="/register">
          <Button type="button" variant="outline" className="w-full">
            <UserRoundPlus />
            <span>Criar conta</span>
          </Button>
        </Link>
      </Card>
    </UnauthenticatedPageLayout>
  );
}
