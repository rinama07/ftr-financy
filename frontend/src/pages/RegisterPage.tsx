import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";

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
import { useAuthStore } from "@/store/auth.store";
import type { RegisterInput } from "@/types";
import { toast } from "sonner";

const FormFields = {
  name: "name",
  email: "email",
  password: "password",
} as const;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    setIsLoading(true);

    try {
      const registerMutate = await signup(data);

      if (registerMutate) {
        navigate(ROUTES.base);
        toast.dismiss();
      }
    } catch (error) {
      toast.error(
        "Não foi possível concluir o registro. Por favor, tente novamente!",
        {
          id: "signup-error-toast",
        },
      );

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md p-8 my-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="p-0 m-0">
          <FieldLegend className="w-full text-center text-gray-800">
            Criar conta
          </FieldLegend>

          <FieldDescription className="w-full text-center text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={FormFields.name}>Nome completo</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <UserRound />
                </InputGroupAddon>
                <InputGroupInput
                  id={FormFields.name}
                  type="name"
                  placeholder="Seu nome completo"
                  className="mx-1"
                  required
                  {...register(FormFields.name)}
                />
              </InputGroup>
            </Field>

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
                  required
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
                  minLength={8}
                  className="mx-1"
                  required
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
              <FieldDescription>
                A senha deve ter no mínimo 8 caracteres
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          variant="default"
          className="w-full mt-5"
          disabled={isLoading}
        >
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
