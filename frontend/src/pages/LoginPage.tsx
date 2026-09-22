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
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { LinkButton } from "@/components/buttons/LinkButton";
import { OutlineButton } from "@/components/buttons/OutlineButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { EmailField } from "@/components/forms/EmailField";
import { PasswordField } from "@/components/forms/PasswordField";
import { ROUTES } from "@/routes";
import { useAuthStore } from "@/store/auth.store";
import type { LoginInput } from "@/types";

const FormFields = {
  email: "email",
  password: "password",
} as const;

export function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInput>();

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

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <Card className="w-full max-w-md p-8 my-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FieldSet className="p-0 m-0">
          <FieldLegend className="w-full text-center text-gray-800">
            Fazer login
          </FieldLegend>

          <FieldDescription className="w-full text-center text-gray-600">
            Entre na sua conta para continuar
          </FieldDescription>

          <FieldGroup>
            <EmailField
              id={FormFields.email}
              label="E-mail"
              placeholder="mail@exemplo.com"
              required
              {...register(FormFields.email)}
            />

            <PasswordField
              id={FormFields.password}
              label="Senha"
              placeholder="Digite sua senha"
              required
              {...register(FormFields.password)}
            />
          </FieldGroup>

          <div className="flex flex-row">
            <Field orientation="horizontal">
              <Checkbox id="remember-user" />
              <FieldLabel htmlFor="remember-user">Lembrar-me</FieldLabel>
            </Field>

            <LinkButton onClick={handleResetPassword}>
              <span>Recuperar senha</span>
            </LinkButton>
          </div>
        </FieldSet>

        <PrimaryButton type="submit" disabled={isLoading}>
          <span>Entrar</span>
        </PrimaryButton>
      </form>

      <FieldSeparator className="my-2">
        <span className="text-gray-500">ou</span>
      </FieldSeparator>

      <span className="text-center text-gray-600">
        Ainda não tem uma conta?
      </span>

      <Link to={ROUTES.public.register}>
        <OutlineButton>
          <UserRoundPlus />
          <span>Criar conta</span>
        </OutlineButton>
      </Link>
    </Card>
  );
}
