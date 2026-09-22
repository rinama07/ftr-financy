import { LogIn, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { OutlineButton } from "@/components/buttons/OutlineButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { EmailField } from "@/components/forms/EmailField";
import { PasswordField } from "@/components/forms/PasswordField";
import { TextField } from "@/components/forms/TextField";
import { Card } from "@/components/ui/card";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { ROUTES } from "@/routes";
import { useAuthStore } from "@/store/auth.store";
import type { RegisterInput } from "@/types";

const FormFields = {
  name: "name",
  email: "email",
  password: "password",
} as const;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterInput>();

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

  return (
    <Card className="w-full max-w-md p-8 my-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FieldSet className="p-0 m-0">
          <FieldLegend className="w-full text-center text-gray-800">
            Criar conta
          </FieldLegend>

          <FieldDescription className="w-full text-center text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </FieldDescription>

          <FieldGroup>
            <TextField
              id={FormFields.name}
              label="Nome completo"
              type="name"
              placeholder="Seu nome completo"
              addon={<UserRound />}
              {...register(FormFields.name)}
            />

            <EmailField
              id={FormFields.email}
              required
              {...register(FormFields.email)}
            />

            <PasswordField
              description="A senha deve ter no mínimo 8 caracteres"
              id={FormFields.password}
              minLength={8}
              required
              {...register(FormFields.password)}
            />
          </FieldGroup>
        </FieldSet>

        <PrimaryButton type="submit" disabled={isLoading}>
          <span>Cadastrar</span>
        </PrimaryButton>
      </form>

      <FieldSeparator className="my-2">
        <span className="text-gray-500">ou</span>
      </FieldSeparator>

      <span className="text-center text-gray-600">Já tem uma conta?</span>

      <Link to={ROUTES.public.login}>
        <OutlineButton>
          <LogIn />
          <span>Fazer login</span>
        </OutlineButton>
      </Link>
    </Card>
  );
}
