import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { ROUTES } from "@/routes";
import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // TODO: Create register flow
    alert("SUBMIT");
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md p-8 my-8">
      <form onSubmit={handleSubmit}>
        <FieldSet className="p-0 m-0">
          <FieldLegend className="w-full text-center text-gray-800">
            Criar conta
          </FieldLegend>

          <FieldDescription className="w-full text-center text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <UserRound />
                </InputGroupAddon>
                <InputGroupInput
                  id="name"
                  type="name"
                  placeholder="Seu nome completo"
                  className="mx-1"
                />
              </InputGroup>
            </Field>

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
              <FieldDescription>
                A senha deve ter no mínimo 8 caracteres
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button type="submit" variant="default" className="w-full mt-5">
          <span>Cadastrar</span>
        </Button>
      </form>

      <FieldSeparator className="my-2">
        <span className="text-gray-500">ou</span>
      </FieldSeparator>

      <span className="text-center text-gray-600">Já tem uma conta?</span>

      <Link to={ROUTES.public.login}>
        <Button type="button" variant="outline" className="w-full">
          <LogIn />
          <span>Fazer login</span>
        </Button>
      </Link>
    </Card>
  );
}
