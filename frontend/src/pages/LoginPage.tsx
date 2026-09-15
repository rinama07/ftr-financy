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
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth.store";
import type { LoginInput } from "@/types";

const FormFields = {
  email: "email",
  password: "password",
} as const;

export function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setIsLoading(true);

    try {
      const loginMutate = await login(data);

      if (loginMutate) {
        navigate("/dashboard");
        toast.dismiss();
      }
    } catch (error) {
      toast.error("Dados de acesso incorretos. Por favor, tente novamente!", {
        id: "login-error-toast",
      });

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <Card className="w-full max-w-md p-8 my-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="p-0 m-0">
          <FieldLegend className="w-full text-center text-gray-800">
            Fazer login
          </FieldLegend>

          <FieldDescription className="w-full text-center text-gray-600">
            Entre na sua conta para continuar
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={FormFields.email}>E-mail</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  id={FormFields.email}
                  type="email"
                  autoComplete="email"
                  placeholder="mail@exemplo.com"
                  className="mx-1"
                  {...register(FormFields.email)}
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor={FormFields.password}>Senha</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupInput
                  id={FormFields.password}
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="mx-1"
                  {...register(FormFields.password)}
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

        <Button
          type="submit"
          variant="default"
          className="w-full mt-5"
          disabled={isLoading}
        >
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
  );
}
