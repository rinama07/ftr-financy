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
import { useAuthStore } from "@/store/auth/auth.store";
import type { LoginInput } from "@/types";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
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
          <FieldLegend className="w-full text-center">
            <span className="font-bold text-xl text-gray-800">Fazer login</span>
          </FieldLegend>

          <FieldDescription className="w-full text-center">
            <span className="text-base font-normal text-gray-600">
              Entre na sua conta para continuar
            </span>
          </FieldDescription>

          <FieldGroup>
            <EmailField
              id="email"
              errorMessage={errors.email?.message}
              {...register("email", { required: "O e-mail é obrigatório" })}
            />

            <PasswordField
              id="password"
              errorMessage={errors.password?.message}
              {...register("password", { required: "A senha é obrigatória" })}
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
